#version 300 es
precision highp float;

in vec2 in_position;

in vec2 in_sprite_pos;
in float in_sprite_index;
in float in_sprite_flip_x;

uniform vec2 u_resolution;
uniform vec3 u_camera;

out vec2 v_texcoord;

vec2 sprite_size = vec2(16.0, 16.0);
vec2 sprite_sheet_size = vec2(576.0, 576.0);
float shrink = 0.1;

void main() {
    float width = sprite_sheet_size.x / sprite_size.x;
    vec2 sprite_index = vec2(int(mod(in_sprite_index, width)), int(in_sprite_index / width));
    vec2 sprite_index_position = sprite_index * sprite_size;

    float s0 = (sprite_index_position.x + shrink) / sprite_sheet_size.x;
    float t0 = sprite_index_position.y / sprite_sheet_size.y;
    float s1 = (sprite_index_position.x + sprite_size.x - shrink) / sprite_sheet_size.x;
    float t1 = (sprite_index_position.y + sprite_size.y - shrink) / sprite_sheet_size.y;

    float s_left = mix(s0, s1, in_sprite_flip_x);
    float s_right = mix(s1, s0, in_sprite_flip_x);

    vec2 texcoords[4];
    texcoords[0] = vec2(s_left, t0);
    texcoords[1] = vec2(s_right, t0);
    texcoords[2] = vec2(s_right, t1);
    texcoords[3] = vec2(s_left, t1);

    vec2 centered = in_sprite_pos + vec2(u_camera);

    vec2 zeroToOne = (in_position * sprite_size + centered) / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    clipSpace *= u_camera.z;

    gl_Position = vec4(clipSpace, 0.0, 1.0);

    vec2 texcoord = texcoords[gl_VertexID];
    v_texcoord = texcoord;
}