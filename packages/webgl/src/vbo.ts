export type Target =
    WebGLRenderingContext["ARRAY_BUFFER"] |
    WebGLRenderingContext["ELEMENT_ARRAY_BUFFER"];

export type Usage =
    WebGLRenderingContext["STATIC_DRAW"] |
    WebGLRenderingContext["DYNAMIC_DRAW"];

const ERROR_CREATE_BUFFER = new Error("ERROR_CREATE_BUFFER gl.createBuffer()")

export type VBO = {
    target: Target
    usage: Usage
    buffer: WebGLBuffer
}

export function
vbo_create(
    gl: WebGL2RenderingContext,
    target: Target,
    usage: Usage,
    data?: ArrayBuffer,
): VBO {
    const buffer = gl.createBuffer();
    if (!buffer) throw ERROR_CREATE_BUFFER;

    const vbo = {
        target,
        usage,
        buffer
    }

    if (data && usage) {
        vbo_data(gl, vbo, data)
    }

    return vbo;
}

export function 
vbo_data(
    gl: WebGL2RenderingContext,
    vbo: VBO,
    data: ArrayBuffer,
) {
    gl.bindBuffer(vbo.target, vbo.buffer);
    gl.bufferData(vbo.target, data, vbo.usage);
}

export function
vbo_bind(
    gl: WebGL2RenderingContext,
    vbo: VBO,
) {
    gl.bindBuffer(vbo.target, vbo.buffer)
}