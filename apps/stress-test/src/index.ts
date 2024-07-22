import { component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { system_create } from "@playground/ecs/system";
import { world_create, world_tick } from "@playground/ecs/world";
import { vector2_create } from "@playground/math/vector2";
import { COLLIDER, COMPONENTS, POSITION, SPRITE, TAG_PLAYER, VELOCITY } from "./components";
import { ENEMY_MOVER } from "./systems/enemy_mover";
import { ENEMY_SPAWNER } from "./systems/enemy_spawner";
import { INPUT } from "./systems/input";
import { PHYSICS } from "./systems/physics";
import { RENDERER } from "./systems/renderer";

const world = world_create(COMPONENTS);

system_create(world, RENDERER);
system_create(world, PHYSICS);
system_create(world, ENEMY_SPAWNER);
system_create(world, ENEMY_MOVER);
system_create(world, INPUT);

const player = entity_create(world);
component_set(world, player, POSITION, vector2_create());
component_set(world, player, VELOCITY, vector2_create());
component_set(world, player, COLLIDER, 1);
component_set(world, player, SPRITE, 0)
component_set(world, player, TAG_PLAYER, 1)

function tick(now: number) {
    window.requestAnimationFrame(tick)
    world_tick(world, now);
}
window.requestAnimationFrame(tick)
