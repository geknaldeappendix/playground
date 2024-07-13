const ERROR_GET_CONTEXT = new Error("ERROR_GET_CONTEXT canvas.getContext(\"webgl2\")");

export function 
context_create(
    canvas: HTMLCanvasElement
): WebGL2RenderingContext {
    const context = canvas.getContext("webgl2")
    if (!context) throw ERROR_GET_CONTEXT;
    context.enable(context.DEPTH_TEST);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
    return context;
}