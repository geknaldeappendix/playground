import { System } from "@playground/ecs/System";
import { AssetType, Assets } from "@playground/engine/Assets";
import { vbo_create } from "@playground/webgl/vbo";
import { AssetNames, Shader, Texture } from "../assets";

const spriteData = [
    // x, y, texCoordX, texCoordY, texCoordWidth, texCoordHeight
    { pos: [0, 0], texCoords: [0, 0, 0.25, 0.25] },
    { pos: [1, 0], texCoords: [0.25, 0, 0.25, 0.25] },
    // Add more sprites as needed
  ];

export class MobRenderer extends System {
    public interval: number = 1000 / 30;

    private program: WebGLProgram;
    private sprite_sheet: WebGLTexture;

    // private vertex_buffer: WebGLBuffer;
    private position_buffer: WebGLBuffer;
    private tex_coords_buffer: WebGLBuffer;

    public constructor(
        private canvas: HTMLCanvasElement,
        private gl: WebGL2RenderingContext,
        assets: Assets<AssetNames>
    ) { 
        super();
        this.program = assets.get(AssetType.Shader, Shader.mob_renderer)!;
        this.sprite_sheet = assets.get(AssetType.Texture, Texture.mob_sprite_sheet)!;

        // this.vertex_buffer = vbo_create()
        this.position_buffer = vbo_create(gl, );
        this.tex_coords_buffer = vbo_create();
        

        gl.bindTexture(gl.TEXTURE_2D, this.sprite_sheet);
    }

    public tick(delta: number): void {
        const { canvas, gl } = this;
        gl.useProgram(this.program);



        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}