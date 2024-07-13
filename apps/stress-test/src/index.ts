import { Engine } from "@playground/engine/Engine";
import { vector2_create } from "@playground/math/vector2";
import { AssetNames, assets_load } from "./assets";
import { ComponentMap, ComponentType } from "./components";
import { Renderer } from "./systems/renderer";

const { world, assets, canvas, gl } = new Engine<ComponentMap, AssetNames>(ComponentType);
await assets_load(assets, gl)
world.system_push(new Renderer(canvas, gl, assets))

const player = world.entity_create();

world.set(player, ComponentType.Position, vector2_create());
world.set(player, ComponentType.Velocity, vector2_create());
world.set(player, ComponentType.Sprite, "player1");

(function tick(now: number) {
    window.requestAnimationFrame(tick)
    world.tick(now);
})(0);