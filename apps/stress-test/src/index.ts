import { Engine } from "@playground/engine/Engine";
import { AssetNames, assets_load } from "./assets";
import { Component, Components } from "./components";
import { CameraFollower } from "./systems/CameraFollower";
import { MobSpawner } from "./systems/MobSpawner";
import { Physics } from "./systems/Physics";
import { SpriteSheetRenderer } from "./systems/SpriteSheetRenderer";

const { world, assets, canvas, gl, camera, input } = new Engine<Components, AssetNames>(Component);
await assets_load(assets, gl)

world.system_push(new SpriteSheetRenderer(canvas, gl, assets, camera))
world.system_push(new Physics())
world.system_push(new MobSpawner())
world.system_push(new CameraFollower(input, camera))

gl.clearColor(1.0, 1.0, 1.0, 1.0);
(function tick(now: number) {
    window.requestAnimationFrame(tick)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    world.tick(now);
})(0);