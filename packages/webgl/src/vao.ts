import { Target } from "./vbo"

export type Attribute = {
    location: string
    size: number
    stride?: number
    offset?: number
    buffer_index: number
}

const ERROR_CREATE_VERTEX_ARRAY = new Error("ERROR_CREATE_VERTEX_ARRAY gl.createVertexArray()")
const ERROR_BUFFER_INDEX_NOT_FOUND = new Error("ERROR_BUFFER_INDEX_NOT_FOUND buffer = buffers[buffer_index]")

export function
vao_create(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    buffers: Array<[Target, WebGLBuffer]>,
    attributes: Array<Attribute>
): WebGLVertexArrayObject {
    const vertex_array_object = gl.createVertexArray();
    if (!vertex_array_object) throw ERROR_CREATE_VERTEX_ARRAY

    gl.bindVertexArray(vertex_array_object);
    gl.useProgram(program);

    buffers.filter(buffer => buffer[0] === gl.ELEMENT_ARRAY_BUFFER)
        .forEach(([target, buffer]) => {
            gl.bindBuffer(target, buffer);
        });

    attributes.forEach(({ buffer_index, location, size, stride, offset }) => {
        const buffer = buffers[buffer_index];
        if (!buffer) throw ERROR_BUFFER_INDEX_NOT_FOUND;
        gl.bindBuffer(buffer[0], buffer[1]);
        const index = gl.getAttribLocation(program, location);
        gl.vertexAttribPointer(index, size, gl.FLOAT, false, stride || 0, offset || 0);
        gl.enableVertexAttribArray(index);
    });

    gl.bindVertexArray(null);
    return vertex_array_object;

}