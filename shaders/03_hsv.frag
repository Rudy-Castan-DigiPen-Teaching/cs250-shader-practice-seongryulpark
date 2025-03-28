#version 300 es
precision mediump float;

#define TWO_PI 6.28318530718

/**
 * \file
 * \author Rudy Castan
 * \author seongryul park
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

out vec4 FragColor;

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x) + sin(u_time * 0.5) * TWO_PI;
    float radius = length(toCenter)*2.;

    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius, 1. + abs(sin(u_time * 0.5))));

    color = mix(color, vec3(0., 0., 0.), sin(u_time));

    FragColor = vec4(color, 1.0);
}
