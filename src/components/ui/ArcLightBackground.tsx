"use client";

import { useEffect, useRef, useState } from "react";

export default function ArcLightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment shader — eclipse arc
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;

      float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        float t = uTime;

        // Parabolic arc from bottom-left to bottom-right
        float x = uv.x;
        float bend = pow(x - 0.5, 2.0) * 2.0 - 0.28;

        // Animate
        float yOff = bend + sin(t * 0.4) * 0.015 + cos(t * 0.25) * 0.01;
        float dist = abs(uv.y - yOff);

        // Core brightness
        float core = exp(-dist * dist * 120.0);
        float glow = exp(-dist * dist * 30.0) * 0.5;
        float ambient = exp(-dist * dist * 6.0) * 0.06;
        float intensity = core + glow + ambient;

        // Organic shimmer
        float shimmer = noise(vec2(x * 20.0, uv.y * 10.0 + t * 0.3)) * 0.04;
        intensity += shimmer * intensity;

        // Chromatic colors at edges
        float hue = x * 2.5 + t * 0.15;
        vec3 cyan = vec3(0.0, 0.85, 1.0);
        vec3 blue = vec3(0.15, 0.35, 1.0);
        vec3 orange = vec3(1.0, 0.55, 0.05);
        vec3 yellow = vec3(1.0, 0.92, 0.15);
        vec3 red = vec3(1.0, 0.15, 0.08);

        float hf = fract(hue);
        vec3 chroma = mix(cyan, blue, smoothstep(0.0, 0.2, hf));
        chroma = mix(chroma, orange, smoothstep(0.2, 0.5, hf));
        chroma = mix(chroma, yellow, smoothstep(0.5, 0.75, hf));
        chroma = mix(chroma, red, smoothstep(0.75, 1.0, hf));

        float edgeMask = smoothstep(0.005, 0.04, dist) * smoothstep(0.15, 0.04, dist);

        // White-hot core + chromatic edges
        vec3 color = vec3(1.0, 0.98, 0.96) * core;
        color += vec3(1.0, 0.95, 0.9) * glow * 0.6;
        color += chroma * edgeMask * 0.7;

        // Vignette
        float vig = smoothstep(1.3, 0.5, length(uv - 0.5) * 1.4);
        color *= vig;

        // Tone map
        color = color / (1.0 + color * 0.25);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) {
      setWebglFailed(true);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebglFailed(true);
      return;
    }

    // Full-screen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");

    let animId = 0;
    const startTime = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
      if (!gl || !canvas) return;
      const t = (performance.now() - startTime) / 1000;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  // CSS fallback when WebGL fails
  if (webglFailed) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] opacity-80"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,255,255,0.9) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 45% 100%, rgba(0,200,255,0.5) 0%, transparent 40%),
              radial-gradient(ellipse 80% 50% at 55% 100%, rgba(255,100,50,0.5) 0%, transparent 40%),
              radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,200,50,0.3) 0%, transparent 50%)
            `,
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 30% at 50% 100%, rgba(255,255,255,0.6) 0%, transparent 60%)
            `,
            filter: "blur(40px)",
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ zIndex: 0 }}
    />
  );
}
