"use client"

import { useRef, useEffect } from "react"

const vertexShader = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289v3(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289v4(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289v4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  vec2 C = vec2(1.0/6.0, 1.0/3.0);
  vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g, l.zxy);
  vec3 i2 = max(g, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 xx = x_ * ns.x + ns.yyyy;
  vec4 yy = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(xx) - abs(yy);
  vec4 b0 = vec4(xx.xy, yy.xy);
  vec4 b1 = vec4(xx.zw, yy.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p){
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 6; i++){
    v += a * snoise(p);
    p = p * 2.1 + vec3(0.12, 0.07, 0.09);
    a *= 0.47;
  }
  return v;
}

float hexGrid(vec2 p, float scale) {
  p *= scale;
  vec2 h = vec2(1.0, 1.732);
  vec2 a = mod(p, h) - h * 0.5;
  vec2 b = mod(p + h * 0.5, h) - h * 0.5;
  return min(length(a), length(b));
}

// Orbit ring
float orbitRing(vec2 uv, float radius, float width, float t, float speed, float segments) {
  float d = abs(length(uv) - radius);
  float ring = 1.0 - smoothstep(0.0, width, d);
  float a = atan(uv.y, uv.x);
  float seg = sin(a * segments + t * speed) * 0.5 + 0.5;
  seg = pow(seg, 3.0);
  return ring * seg;
}

// Data dot orbiting
float orbitDot(vec2 uv, float radius, float t, float speed, float dotSize) {
  float a = t * speed;
  vec2 dotPos = vec2(cos(a), sin(a)) * radius;
  return 1.0 - smoothstep(0.0, dotSize, length(uv - dotPos));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float dist = length(uv);
  float t = u_time * 0.35;
  float angle = atan(uv.y, uv.x);

  // Rotation
  float rot = t * 0.5;
  vec2 ruv = vec2(
    uv.x * cos(rot) - uv.y * sin(rot),
    uv.x * sin(rot) + uv.y * cos(rot)
  );

  // Edge distortion
  float edgeNoise = fbm(vec3(ruv * 4.0, t * 0.3)) * 0.04;
  edgeNoise += snoise(vec3(ruv * 9.0, t * 0.5)) * 0.015;
  float dd = dist + edgeNoise;

  // Sphere
  float sphere = 1.0 - smoothstep(0.28, 0.34, dd);

  // Outer wisps
  float wispNoise = fbm(vec3(ruv * 2.5, t * 0.4));
  float wisps = exp(-dd * 5.0) * (0.2 + 0.2 * wispNoise);
  float wispMask = 1.0 - smoothstep(0.32, 0.45, dd - wispNoise * 0.03);

  // 3D depth
  float zz = sqrt(max(0.0, 0.32 * 0.32 - dot(uv, uv)));
  vec3 pos = vec3(ruv, zz);

  // Plasma
  float n1 = fbm(pos * 3.5 + vec3(t * 0.8, t * 0.4, t * 0.2));
  float n2 = fbm(pos * 5.5 + vec3(-t * 0.5, t * 0.7, -t * 0.3));
  float n3 = fbm(pos * 8.0 + vec3(t * 0.3, -t * 0.6, t * 0.9));
  float n4 = snoise(pos * 14.0 + vec3(t * 0.6, t * 0.2, -t * 0.5));

  // Colors
  vec3 violet = vec3(0.4, 0.08, 1.0);
  vec3 pink = vec3(1.0, 0.03, 0.5);
  vec3 green = vec3(0.0, 0.95, 0.4);
  vec3 cyan = vec3(0.0, 0.85, 1.0);
  vec3 darkCore = vec3(0.03, 0.01, 0.12);

  // Color zones
  float rotAngle = angle + t * 0.4;
  float w1 = pow(max(0.0, sin(rotAngle)), 2.0);
  float w2 = pow(max(0.0, sin(rotAngle + 2.094)), 2.0);
  float w3 = pow(max(0.0, sin(rotAngle + 4.189)), 2.0);
  float wSum = w1 + w2 + w3 + 0.001;

  vec3 color = violet * (w1 / wSum) + pink * (w2 / wSum) + green * (w3 / wSum);
  color = mix(darkCore, color, 0.55 + n1 * 0.35);

  // Hex grid - stronger
  float hex = hexGrid(ruv + vec2(t * 0.08), 22.0);
  float hexLine = 1.0 - smoothstep(0.02, 0.05, hex);
  float hexPulse = sin(hex * 30.0 - u_time * 2.0) * 0.5 + 0.5;
  color += hexLine * cyan * 0.3 * sphere;
  color += hexLine * hexPulse * green * 0.15 * sphere;

  // Scan lines
  float scan1 = smoothstep(0.0, 0.015, abs(sin(ruv.y * 100.0 + t * 3.0)));
  float scan2 = smoothstep(0.0, 0.008, abs(sin(ruv.y * 250.0 + t * 6.0)));
  color *= 0.82 + (scan1 * 0.12 + scan2 * 0.06);

  // Circuit filaments
  float c1 = pow(abs(sin(n1 * 9.0 + n2 * 6.0)), 14.0);
  float c2 = pow(abs(sin(n2 * 7.0 + n3 * 5.0)), 16.0);
  float c3 = pow(abs(sin(n3 * 10.0 + n1 * 7.0)), 12.0);
  color += c1 * violet * 2.5;
  color += c2 * pink * 2.0;
  color += c3 * green * 1.5;

  // Holographic shimmer
  float holo = sin(angle * 12.0 + dist * 40.0 - u_time * 4.0) * 0.5 + 0.5;
  holo = pow(holo, 6.0);
  color += holo * cyan * 0.15 * sphere;

  // Glitch
  float glitchTime = floor(u_time * 10.0);
  float glitch = step(0.93, fract(sin(glitchTime * 43.17) * 4371.71));
  float glitchBand = glitch * step(0.5, fract(ruv.y * 20.0 + glitchTime * 0.1));
  color = mix(color, cyan * 1.5, glitchBand * 0.35 * sphere);

  // Fresnel edge
  float fresnel = pow(max(0.0, 1.0 - zz / 0.32), 4.0) * sphere;
  float edgeCircuit = pow(abs(sin(angle * 8.0 + t * 2.5)), 24.0);
  vec3 rimColor = mix(cyan, violet, sin(angle * 3.0 + t) * 0.5 + 0.5);
  rimColor = mix(rimColor, green, sin(angle * 2.0 - t * 0.8) * 0.3 + 0.3);
  color += fresnel * rimColor * 0.5;
  color += fresnel * edgeCircuit * cyan * 1.0;

  // Fine detail
  color += n4 * 0.06 * vec3(0.4, 0.2, 1.0) * sphere;

  // Crevices
  float crevice = smoothstep(0.0, 0.1, abs(n1 + n2));
  color *= 0.3 + crevice * 0.7;

  // Specular
  vec2 lightDir = normalize(vec2(-0.5, -0.4));
  float spec = pow(max(0.0, dot(normalize(uv), lightDir)), 28.0);
  color += spec * vec3(0.7, 0.9, 1.0) * 0.2 * sphere;

  color *= 0.8;

  // === ORBIT RINGS (outside sphere) ===
  float ring1 = orbitRing(uv, 0.38, 0.006, u_time, 2.0, 8.0);
  float ring2 = orbitRing(uv, 0.42, 0.004, u_time, -1.5, 12.0);
  float ring3 = orbitRing(uv, 0.46, 0.003, u_time, 1.0, 6.0);

  vec3 ringColor1 = violet * 0.7;
  vec3 ringColor2 = cyan * 0.5;
  vec3 ringColor3 = green * 0.4;

  // Orbiting data dots
  float dot1 = orbitDot(uv, 0.38, u_time, 1.2, 0.012);
  float dot2 = orbitDot(uv, 0.42, u_time, -0.8, 0.010);
  float dot3 = orbitDot(uv, 0.42, u_time, 0.6, 0.008);
  float dot4 = orbitDot(uv, 0.46, u_time, -1.0, 0.010);

  // Wisp color
  vec3 wispColor = mix(violet, pink, sin(angle + t * 0.5) * 0.5 + 0.5);
  wispColor = mix(wispColor, cyan, sin(angle * 1.5 - t * 0.3) * 0.3 + 0.3);
  wispColor *= 0.35;

  // Composite
  float alpha = sphere + wisps * wispMask * 0.45;
  vec3 finalColor = color * sphere + wispColor * wisps * wispMask * 0.3;

  // Add rings
  finalColor += ring1 * ringColor1;
  finalColor += ring2 * ringColor2;
  finalColor += ring3 * ringColor3;
  alpha += (ring1 + ring2 + ring3) * 0.6;

  // Add dots
  finalColor += dot1 * violet * 1.5;
  finalColor += dot2 * cyan * 1.2;
  finalColor += dot3 * pink * 1.0;
  finalColor += dot4 * green * 1.0;
  alpha += (dot1 + dot2 + dot3 + dot4) * 0.8;

  // Halo
  float haloVal = exp(-dist * 3.5) * 0.06;
  vec3 haloC = mix(violet, cyan, sin(t * 0.5) * 0.5 + 0.5) * 0.25;
  finalColor += haloC * haloVal;
  alpha += haloVal * 0.2;

  // Pulse
  float pulse = sin(u_time * 1.5) * 0.04 + 1.0;
  finalColor *= pulse;

  gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
}
`

export function EnergySphere({ size = 360 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader))
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vs || !fs) return

    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(prog))
      return
    }

    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes = gl.getUniformLocation(prog, "u_resolution")

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let animId: number
    const draw = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(animId)
  }, [])

  const px = size * 2
  return (
    <canvas
      ref={canvasRef}
      width={px}
      height={px}
      style={{ width: size, height: size }}
      className="pointer-events-none"
    />
  )
}
