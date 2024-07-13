#version 300 es

precision mediump float;

in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 out_gl_FragColor;

void main() {
    vec4 color = texture(u_texture, v_texcoord);
    out_gl_FragColor = color;
}