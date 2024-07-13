import { System } from "@playground/ecs/System";
import { Assets } from "@playground/engine/Assets";
import { AssetNames } from "../assets";

export class Renderer extends System {
    public interval: number = 1000 / 30;

    public constructor(
        private canvas: HTMLCanvasElement,
        private gl: WebGL2RenderingContext,
        private assets: Assets<AssetNames>
    ) { 
        super();
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    }

    public tick(delta: number): void {
        const { canvas, gl } = this;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    }
}