const ERROR_GET_CONTEXT = new Error("ERROR_GET_CONTEXT canvas.getContext(\"webgl2\")");

export function 
context_create(
    canvas: HTMLCanvasElement
): WebGL2RenderingContext {
    const gl = canvas.getContext("webgl2", { 
        // premultipliedAlpha: false, 
        // alpha: false 
    })
    if (!gl) throw ERROR_GET_CONTEXT;
    gl.enable(gl.DEPTH_TEST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    return gl;
}