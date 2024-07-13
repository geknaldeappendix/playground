#version 300 es

in vec3 in_position;
in vec2 in_texcoord;
in vec2 in_sprite_pos;
in vec4 in_sprite_texcoord;

out vec2 v_texcoord;

void main() {
    gl_Position = vec4(in_position, 1);
    v_texcoord = in_texcoord;
}