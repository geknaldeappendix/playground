#version 300 es

in vec2 in_position;
// in vec2 in_texcoord;

// in vec2 in_sprite_pos;
in float in_sprite_index;

// uniform vec2 u_resolution;

out vec2 v_texcoord;

uniform mat4 u_projection;
uniform mat4 u_view;

vec2 sprite_size = vec2(16.0, 16.0);
vec2 sprite_sheet_size = vec2(576.0, 576.0);
float shrink = 0.5;

void main() {
    float width = sprite_sheet_size.x / sprite_size.x;
    vec2 sprite_index = vec2(mod(in_sprite_index, width), in_sprite_index / width);
    vec2 sprite_index_position = vec2(in_sprite_index, 0) * sprite_size;

    float s0 = (sprite_index_position.x + shrink) / sprite_sheet_size.x;
    float t0 = sprite_index_position.y / sprite_sheet_size.y;
    float s1 = (sprite_index_position.x + sprite_size.x - shrink) / sprite_sheet_size.x;
    float t1 = (sprite_index_position.y + sprite_size.y - shrink) / sprite_sheet_size.y;

    vec2 texcoords[4];
    texcoords[0] = vec2(s0, t0);
    texcoords[1] = vec2(s1, t0);
    texcoords[2] = vec2(s1, t1);
    texcoords[3] = vec2(s0, t1);

    v_texcoord = texcoords[gl_VertexID];

    gl_Position = u_projection * u_view * vec4(in_position, 0.0, 1.0);

}