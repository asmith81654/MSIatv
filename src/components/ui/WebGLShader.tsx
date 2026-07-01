"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // 2D rotation matrix
  mat2 rot2(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // Sigmoid-like falloff for smooth arc
  float smoothArc(vec2 uv, float yPos, float width, float edgeSoftness) {
    float dist = abs(uv.y - yPos);
    return 1.0 - smoothstep(width * 0.3, width + edgeSoftness, dist);
  }

  // Create the sweeping arc of light
  float arcLight(vec2 uv, float t) {
    // Bend: parabolic arc rising from bottom-left to bottom-right
    float x = uv.x;
    float bend = pow(x - 0.5, 2.0) * 1.8 - 0.35;

    // Animate the arc position slightly
    float yOffset = bend + sin(t * 0.5) * 0.02 + cos(t * 0.3) * 0.015;

    // Distance from the arc curve
    float dist = abs(uv.y - yOffset);

    // Core intensity — very bright center, falls off rapidly
    float core = exp(-dist * dist * 80.0);

    // Wider glow halo
    float glow = exp(-dist * dist * 25.0) * 0.4;

    // Secondary ambient glow
    float ambient = exp(-dist * dist * 8.0) * 0.08;

    return core + glow + ambient;
  }

  // Chromatic dispersion along the arc edge
  vec3 chromaticEdge(vec2 uv, float intensity, float t) {
    float x = uv.x;
    float bend = pow(x - 0.5, 2.0) * 1.8 - 0.35;
    float dist = abs(uv.y - bend);

    // Create rainbow offset based on position and time
    float hue = x * 3.0 + uv.y * 2.0 + t * 0.2;

    // Chromatic colors: cyan → blue → orange → yellow → red
    vec3 cyan = vec3(0.0, 0.8, 1.0);
    vec3 blue = vec3(0.2, 0.4, 1.0);
    vec3 orange = vec3(1.0, 0.6, 0.1);
    vec3 yellow = vec3(1.0, 0.9, 0.2);
    vec3 red = vec3(1.0, 0.2, 0.1);

    // Mix between colors based on hue
    vec3 color = mix(cyan, blue, smoothstep(0.0, 0.25, fract(hue * 0.5)));
    color = mix(color, orange, smoothstep(0.25, 0.5, fract(hue * 0.5)));
    color = mix(color, yellow, smoothstep(0.5, 0.75, fract(hue * 0.5)));
    color = mix(color, red, smoothstep(0.75, 1.0, fract(hue * 0.5)));

    // Only show chromatic at edges of the glow
    float edgeMask = smoothstep(0.01, 0.06, dist) * smoothstep(0.18, 0.06, dist);

    return color * edgeMask * intensity * 0.8;
  }

  // Subtle noise for organic feel
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime;

    // Pure black background
    vec3 color = vec3(0.0);

    // Main arc light
    float arcIntensity = arcLight(uv, t);

    // Add subtle organic shimmer using noise
    float shimmer = noise(uv * 15.0 + t * 0.3) * 0.03;
    arcIntensity += shimmer * arcIntensity;

    // Core is white-hot
    vec3 coreColor = vec3(1.0, 0.98, 0.95) * arcIntensity;

    // Chromatic aberration at edges
    vec3 chromaColor = chromaticEdge(uv, arcIntensity, t);

    // Combine core white + chromatic edges
    color = coreColor + chromaColor;

    // Slight vignette to keep edges dark
    float vignette = smoothstep(1.2, 0.4, length(uv - 0.5) * 1.3);
    color *= vignette;

    // Tone mapping to prevent over-blowing highlights
    color = color / (1.0 + color * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface WebGLShaderProps {
  className?: string;
}

export default function WebGLShader({ className = "" }: WebGLShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms = {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const startTime = Date.now();

    const animate = () => {
      uniforms.uTime.value = (Date.now() - startTime) / 1000;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
