#version 300 es

in vec2 in_position;
// in vec2 in_texcoord;

in vec2 in_sprite_pos;
in float in_sprite_index;

uniform vec2 u_resolution;
uniform vec2 u_camera;

out vec2 v_texcoord;

vec2 sprite_size = vec2(16.0, 16.0);
vec2 sprite_sheet_size = vec2(576.0, 576.0);

void main() {
    float width = sprite_sheet_size.x / sprite_size.x;
    vec2 sprite_index = vec2(int(mod(in_sprite_index, width)), int(in_sprite_index / width));
    vec2 sprite_index_position = sprite_index * sprite_size;

    float s0 = (sprite_index_position.x) / sprite_sheet_size.x;
    float t0 = sprite_index_position.y / sprite_sheet_size.y;
    float s1 = (sprite_index_position.x + sprite_size.x) / sprite_sheet_size.x;
    float t1 = (sprite_index_position.y + sprite_size.y) / sprite_sheet_size.y;

    vec2 texcoords[4];
    texcoords[0] = vec2(s0, t0);
    texcoords[1] = vec2(s1, t0);
    texcoords[2] = vec2(s1, t1);
    texcoords[3] = vec2(s0, t1);

    vec2 zeroToOne = (in_position + in_sprite_pos + u_camera) / u_resolution * sprite_size;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace, 0.0, 1.0);

    v_texcoord = texcoords[gl_VertexID];
}