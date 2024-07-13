export type Target =
    WebGLRenderingContext["ARRAY_BUFFER"] |
    WebGLRenderingContext["ELEMENT_ARRAY_BUFFER"];

export type Usage =
    WebGLRenderingContext["STATIC_DRAW"] |
    WebGLRenderingContext["DYNAMIC_DRAW"];

const ERROR_CREATE_BUFFER = new Error("ERROR_CREATE_BUFFER gl.createBuffer()")

export function
vbo_create(
    gl: WebGL2RenderingContext,
    target: Target,
    data: ArrayBuffer,
    usage: Usage
): [Target, WebGLBuffer] {
    const buffer = gl.createBuffer();
    if (!buffer) throw ERROR_CREATE_BUFFER;

    gl.bindBuffer(target, buffer);
    gl.bufferData(target, data, usage);

    return [target, buffer];
}