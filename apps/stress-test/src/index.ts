import { Engine } from "@playground/engine/Engine";
import { vector2_create } from "@playground/math/vector2";
import { AssetNames, assets_load } from "./assets";
import { Component, Components } from "./components";
import { CameraFollower } from "./systems/CameraFollower";
import { MobSpawner } from "./systems/MobSpawner";
import { Physics } from "./systems/Physics";
import { PlayerInput } from "./systems/PlayerInput";
import { SpriteSheetRenderer } from "./systems/SpriteSheetRenderer";

const { world, assets, canvas, gl, camera, input } = new Engine<Components, AssetNames>(Component);
await assets_load(assets, gl)

const player_id = world.entity_create();
world.set(player_id, Component.Position, vector2_create(0, 0))
world.set(player_id, Component.Velocity, vector2_create(0, 0))
world.set(player_id, Component.Sprite, 0)

world.system_push(new SpriteSheetRenderer(canvas, gl, assets, camera))
world.system_push(new Physics())
world.system_push(new MobSpawner())
world.system_push(new CameraFollower(camera, input, player_id))
world.system_push(new PlayerInput(input, player_id))

gl.clearColor(1.0, 1.0, 1.0, 1.0);
(function tick(now: number) {
    window.requestAnimationFrame(tick)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    world.tick(now);
})(0);