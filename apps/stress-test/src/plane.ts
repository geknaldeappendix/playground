import { vao_create } from "@playground/webgl/vao";
import { vbo_create } from "@playground/webgl/vbo";

export function
plane_create(
    gl: WebGL2RenderingContext,
    program: WebGLProgram
): WebGLVertexArrayObject {
    return vao_create(gl, program, [
        vbo_create(gl, gl.ARRAY_BUFFER, new Float32Array([
            0.5, 0.5, 0.0,  1.0, 1.0,
            0.5, -0.5, 0.0,  1.0, 0.0,
            -0.5, -0.5, 0.0,  0.0, 0.0,
            -0.5, 0.5, 0.0,  0.0, 1.0,
        ]), gl.STATIC_DRAW),
        vbo_create(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
            0, 1, 2,
            0, 2, 3,
        ]), gl.STATIC_DRAW)
    ], [
        {
            buffer_index: 0,
            location: "in_position",
            size: 3,
            stride: 5 * 4
        }, {
            buffer_index: 0,
            location: "in_texcoord",
            size: 2,
            stride: 5 * 4,
            offset: 3 * 4
        }
    ])
}