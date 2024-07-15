import { camera_tick_ortho } from "@playground/engine/Camera";
import { Engine } from "@playground/engine/Engine";
import { AssetNames, assets_load } from "./assets";
import { Component, Components } from "./components";
import { MobSpawner } from "./systems/MobSpawner";
import { Physics } from "./systems/Physics";
import { SpriteSheetRenderer } from "./systems/SpriteSheetRenderer";

const { world, assets, canvas, gl, camera } = new Engine<Components, AssetNames>(Component);
await assets_load(assets, gl)

world.system_push(new SpriteSheetRenderer(canvas, gl, assets, camera))
world.system_push(new Physics())
world.system_push(new MobSpawner())

gl.clearColor(1.0, 1.0, 1.0, 1.0);
(function tick(now: number) {
    window.requestAnimationFrame(tick)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    camera_tick_ortho(camera)
    world.tick(now);
})(0);