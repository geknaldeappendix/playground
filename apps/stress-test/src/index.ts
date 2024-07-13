import { Engine } from "@playground/engine/Engine";
import { vector2_create } from "@playground/math/vector2";
import { AssetNames, assets_load } from "./assets";
import { ComponentMap, ComponentType } from "./components";
import { MobRenderer } from "./systems/MobRenderer";

const { world, assets, canvas, gl } = new Engine<ComponentMap, AssetNames>(ComponentType);
await assets_load(assets, gl)
world.system_push(new MobRenderer(canvas, gl, assets))

const player = world.entity_create();

world.set(player, ComponentType.Position, vector2_create());
world.set(player, ComponentType.Velocity, vector2_create());
world.set(player, ComponentType.Sprite, "player1");

gl.clearColor(1.0, 1.0, 1.0, 1.0);
(function tick(now: number) {
    window.requestAnimationFrame(tick)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    world.tick(now);
})(0);