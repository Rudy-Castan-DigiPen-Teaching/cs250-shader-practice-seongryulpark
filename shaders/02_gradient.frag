#version 300 es
precision mediump float;

#define PI 3.14159265359

/**
 * \title 03_gradient.frag
 * \author Rudy Castan
 * \author seongryul park
 * \date Mar. 28th 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

uniform vec2 u_resolution;

out vec4 FragColor;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.0, 0.833, 0.224);

void main()
{    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0,1.0, st.x * st.y * 3.0);
    pct.g = sin(st.x * st.y * PI * 3.0);
	pct.b = pow(st.x * st.y,0.2);

    color = mix(colorA, colorB, pct);

    FragColor = vec4(color, 1.0);
}
