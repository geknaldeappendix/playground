import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { canvas } from "@playground/webgl/canvas";
import { gl } from "@playground/webgl/gl";
import { image_create } from "@playground/webgl/image";
import { program_create, program_uniform_location } from "@playground/webgl/program";
import { texture_create } from "@playground/webgl/texture";
import { VBO, vbo_bind, vbo_create, vbo_data } from "@playground/webgl/vbo";
import { camera } from "../camera";
import { POSITION, SPRITE, TAG_PLAYER } from "../components";

const QUERY = query_create([POSITION, SPRITE]);
const QUERY_PLAYER = query_create([POSITION, TAG_PLAYER]);

let program: WebGLProgram;
let texture: WebGLTexture;

let vertex_buffer: VBO, 
    sprite_position_buffer: VBO, 
    sprite_index_buffer: VBO;

let in_position: number,
    in_sprite_position: number,
    in_sprite_index: number;

let u_resolution: WebGLUniformLocation,
    u_camera: WebGLUniformLocation;

const text = document.createElement('p')
text.style.position = 'absolute';
text.style.left = '0';
text.style.top = '0';
document.body.appendChild(text)

export const RENDERER: System = {
    async init() {
        program = await program_create(gl, 'shaders/sprite_sheet.v.glsl', 'shaders/sprite_sheet.f.glsl');
        const image = await image_create('images/mob_sprite_sheet.png');
        texture = texture_create(gl, image);

        vertex_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
             0.5,  0.5,
            -0.5,  0.5
            // 0, 0,
            // 1, 0,
            // 1, 1,
            // 0, 1
        ]));
        sprite_position_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        sprite_index_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        gl.useProgram(program);

        in_position = gl.getAttribLocation(program, 'in_position')
        in_sprite_position = gl.getAttribLocation(program, 'in_sprite_pos')
        in_sprite_index = gl.getAttribLocation(program, 'in_sprite_index')

        u_resolution = program_uniform_location(gl, program, "u_resolution")
        u_camera = program_uniform_location(gl, program, "u_camera")

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1.0, 1.0, 1.0, 1.0)
    },

    render(world) {
        gl.useProgram(program);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const entities = query(world, QUERY);

        const player = query(world, QUERY_PLAYER)[0];
        const position = component_get(world, player, POSITION)
        camera.position[0] = canvas.width / 2 - position[0];
        camera.position[1] = canvas.height / 2 - position[1];
        camera.position[2] = 1;
        text.innerHTML = camera.position[0] + ' | ' + camera.position[1] + ' | ' + camera.position[2]

        gl.uniform2f(u_resolution, canvas.width, canvas.height);
        gl.uniform3fv(u_camera, camera.position);

        // for (const entity of entities) {
        //     const position = component_get(world, entity, POSITION);
        //     const sprite = component_get(world, entity, SPRITE);
        // }
        vbo_bind(gl, vertex_buffer);
        gl.enableVertexAttribArray(in_position);
        gl.vertexAttribPointer(in_position, 2, gl.FLOAT, false, 0, 0);

        const positions = new Float32Array(entities.length * 2)
        let offset = 0;
        entities.forEach(entity => {
            const position = component_get(world, entity, POSITION);
            positions.set(position, offset)
            offset += 2
        });

        vbo_data(gl, sprite_position_buffer, positions);
        gl.enableVertexAttribArray(in_sprite_position);
        gl.vertexAttribPointer(in_sprite_position, 2, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(in_sprite_position, 1);

        const sprite_indexes = new Float32Array(entities.map(entity => component_get(world, entity, SPRITE)).flat())
        vbo_data(gl, sprite_index_buffer, sprite_indexes);
        gl.enableVertexAttribArray(in_sprite_index);
        gl.vertexAttribPointer(in_sprite_index, 1, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(in_sprite_index, 1);

        gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, entities.length);
    }
}