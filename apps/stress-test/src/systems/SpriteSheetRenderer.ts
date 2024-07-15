import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { AssetType, Assets } from "@playground/engine/Assets";
import { Camera, camera_tick_ortho } from "@playground/engine/Camera";
import { program_uniform_location } from "@playground/webgl/program";
import { VBO, vbo_bind, vbo_create, vbo_data } from "@playground/webgl/vbo";
import { AssetNames, Image, Shader, Texture } from "../assets";
import { Component, Components } from "../components";

export class SpriteSheetRenderer extends System<Components> {
    public interval: number = -1;
    public required_components = [Component.Position, Component.Sprite];

    private program: WebGLProgram;
    private image: HTMLImageElement;
    private texture: WebGLTexture;

    private vertex_buffer: VBO;
    private sprite_position_buffer: VBO;
    private sprite_index_buffer: VBO;

    private in_position: number;
    // private in_sprite_position: number;
    private in_sprite_index: number;
    private u_projection: WebGLUniformLocation;
    private u_view: WebGLUniformLocation;

    public constructor(
        private canvas: HTMLCanvasElement,
        private gl: WebGL2RenderingContext,
        assets: Assets<AssetNames>,
        private camera: Camera
    ) { 
        super();
        this.program = assets.get(AssetType.Shader, Shader.sprite_sheet)!;
        this.image = assets.get(AssetType.Image, Image.mob_sprite_sheet)!;
        this.texture = assets.get(AssetType.Texture, Texture.mob_sprite_sheet)!;
        // this.sprite_sheet = new SpriteSheet([this.image.width, this.image.height], [16, 16]);

        this.vertex_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
             0.5,  0.5,
            -0.5,  0.5
        ]));
        // this.tex_coords_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array([
        //     0.0, 0.0,
        //     1.0, 0.0,
        //     0.0, 1.0,
        //     1.0, 1.0
        // ]));
        // this.tex_coords_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW, new Float32Array([
        //     0,
        //     0.9722222222222222,
        //     0.027777777777777776,
        //     0.9722222222222222,
        //     0.027777777777777776,
        //     1,
        //     0,
        //     1
        // ]))
    
        this.sprite_position_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
        this.sprite_index_buffer = vbo_create(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);

        this.in_position = gl.getAttribLocation(this.program, 'in_position')
        // this.in_sprite_position = gl.getAttribLocation(this.program, 'in_sprite_pos')
        this.in_sprite_index = gl.getAttribLocation(this.program, 'in_sprite_index')
        this.u_projection = program_uniform_location(gl, this.program, "u_projection")
        this.u_view = program_uniform_location(gl, this.program, "u_view")

        gl.useProgram(this.program);
        camera_tick_ortho(camera)
        gl.uniformMatrix4fv(this.u_projection, false, this.camera.projection);
        gl.uniformMatrix4fv(this.u_view, false, this.camera.view);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    public render(delta: number, entities: EntityId[]): void {
        const { gl } = this;    
        vbo_bind(gl, this.vertex_buffer);
        gl.enableVertexAttribArray(this.in_position);
        gl.vertexAttribPointer(this.in_position, 2, gl.FLOAT, false, 0, 0);

        // const positions = new Float32Array(entities.length * 2)
        // let offset = 0;
        // entities.forEach(id => {
        //     const position = this.world.get(id, Component.Position)!;
        //     positions.set(position, offset)
        //     offset += 2
        // });

        // vbo_data(gl, this.sprite_position_buffer, positions);
        // gl.enableVertexAttribArray(this.in_sprite_position);
        // gl.vertexAttribPointer(this.in_sprite_position, 2, gl.FLOAT, false, 0, 0);
        // gl.vertexAttribDivisor(this.in_sprite_position, 1);

        const sprite_indexes = new Float32Array(entities.map(id => this.world.get(id, Component.Sprite)!).flat())
        vbo_data(gl, this.sprite_index_buffer, sprite_indexes);
        gl.enableVertexAttribArray(this.in_sprite_index);
        gl.vertexAttribPointer(this.in_sprite_index, 1, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(this.in_sprite_index, 1);

        gl.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, entities.length);
    }
}