import { Engine } from "@playground/engine/Engine";
import { vector2_create } from "@playground/math/vector2";
import { AssetNames, assets_load } from "./assets";
import { Component, Components } from "./components";
import { RendererSystem } from "./systems/Renderer";

const engine = new Engine<Components, AssetNames>(Component);
engine.add_system(RendererSystem)
// engine.add_system(PhysicsSystem)
// engine.add_system(EnemySpawnerSystem)
// engine.add_system(CameraFollowerSystem)
// engine.add_system(PlayerInputSystem)

await assets_load(engine.assets, engine.gl)

const player_id = engine.world.entity_create();
engine.world.set(player_id, Component.Position, vector2_create(0, 0))
engine.world.set(player_id, Component.Velocity, vector2_create(0, 0))
engine.world.set(player_id, Component.Sprite, 0)

engine.start();