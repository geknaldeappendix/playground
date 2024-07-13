type ShaderType = WebGLRenderingContext["VERTEX_SHADER"] | WebGLRenderingContext["FRAGMENT_SHADER"];

const ERROR_CREATE_SHADER = new Error("ERROR_CREATE_SHADER gl.createShader(type)");
const ERROR_CREATE_PROGRAM = new Error("ERROR_CREATE_PROGRAM gl.createProgram()");
const ERROR_UNIFORM_LOCATION_NOT_FOUND = new Error("ERROR_UNIFORM_LOCATION_NOT_FOUND location = gl.getUniformLocation(program, name)");

async function 
_load_file(
    url: string
): Promise<string> {
    const res = await fetch(url);
    return await res.text();
}

function 
shader_compile_from_source(
    gl: WebGLRenderingContext,
    source: string,
    type: ShaderType
): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw ERROR_CREATE_SHADER;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(`${gl.getShaderInfoLog(shader)}`);

    return shader!;
}

export async function 
program_create(
    gl: WebGLRenderingContext,
    vertex_source_url: string,
    fragment_source_url: string
): Promise<WebGLProgram> {
    const program = gl.createProgram();
    if (!program) throw ERROR_CREATE_PROGRAM;

    const vertex_source = await _load_file(vertex_source_url);
    const fragment_source = await _load_file(fragment_source_url);
    const vertex_shader = shader_compile_from_source(gl, vertex_source, gl.VERTEX_SHADER);
    const fragment_shader = shader_compile_from_source(gl, fragment_source, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`${gl.getProgramInfoLog(program)}`);
    }

    gl.deleteShader(vertex_shader);
    gl.deleteShader(fragment_shader);
    return program;
}

export function
program_uniform_location(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    name: string
): WebGLUniformLocation {
    const location = gl.getUniformLocation(program, name);
    if (!location) throw ERROR_UNIFORM_LOCATION_NOT_FOUND;
    return location;
}

