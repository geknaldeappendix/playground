import { ComponentTypes } from "@playground/ecs/Components";
import { System } from "@playground/ecs/System";
import { World } from "@playground/ecs/World";
import { canvas_create_fullscreen } from "@playground/webgl/canvas";
import { context_create } from "@playground/webgl/context";
import { Assets, AssetsNames } from "./Assets";
import { camera_create } from "./Camera";
import { Input } from "./Input";

export class Engine<Components extends ComponentTypes, AssetNames extends AssetsNames> {
    public world: World<Components>;
    public assets: Assets<AssetNames>;
    public canvas = canvas_create_fullscreen()
    public gl = context_create(this.canvas);
    public camera = camera_create(this.canvas);
    public input = new Input(this.canvas)
    
    private bound_tick = this.tick.bind(this);

    public constructor(types: ComponentTypes) {
        this.world = new World(types);
        this.assets = new Assets()
    }

    public add_system(SystemConstructor: new (engine: Engine<any, any>) => System<Components>) {
        this.world.system_push(new SystemConstructor(this))
    }

    public tick(now: number) {
        const { world, canvas, gl } = this;
        window.requestAnimationFrame(this.bound_tick)
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        world.tick(now);
    }

    public start() {
        const { gl } = this;
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        window.requestAnimationFrame(this.bound_tick)
    }
}