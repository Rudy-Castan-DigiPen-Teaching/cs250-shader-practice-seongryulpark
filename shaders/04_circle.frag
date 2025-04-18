#version 300 es

precision mediump float;

/**
 * \file
 * \author Rudy Castan
 * \author Seongryul Park
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 to_coord(vec2 pixel_point) {
    vec2 point = pixel_point / u_resolution;

    if(u_resolution.x > u_resolution.y) {
        point.x *= u_resolution.x / u_resolution.y;
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.x);
    }
    else {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
}

float sCircle(vec2 point, vec2 center, float radius) {
    float d = distance(point, center);

    return d - radius;
}

float circle(vec2 point, vec2 center, float radius) {
    float sd = sCircle(point, center, radius);

    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
}

vec2 calculate_each_pos(float count) {
    count = count * 30.;
    vec2(cos(u_time - count), sin(u_time - count))*0.25 * sin((u_time - count) * 0.25) + vec2(0.5);
}

void main(void)
{
    vec2 position = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(0.2353, 0.8235, 0.8667);

    for(float cnt = 0.; cnt < 6.; cnt++) {
        vec2 p = calculate_each_pos(cnt);

        float t = circle(position, p, 0.125);
        color = mix(color, vec3(0., 1., 0.), t);
    }

    FragColor = vec4(color, 1.0);
}