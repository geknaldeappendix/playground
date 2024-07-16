import { ComponentTypes } from "@playground/ecs/Components";
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

    public constructor(types: ComponentTypes) {
        this.world = new World(types);
        this.assets = new Assets()
    }
}