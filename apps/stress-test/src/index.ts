import { component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { system_create } from "@playground/ecs/system";
import { world_create, world_pause, world_resume, world_tick } from "@playground/ecs/world";
import { vector2_create } from "@playground/math/vector2";
import { ANIMATOR, COLLIDER, COMPONENTS, INPUT, POSITION, SPRITE, TAG_PLAYER, VELOCITY } from "./components";
import { ANIMATOR_SYSTEM } from "./systems/animator";
import { ENEMY_MOVEMENT } from "./systems/enemy_movement";
import { ENEMY_SPAWNER } from "./systems/enemy_spawner";
import { LIFETIME_DESTROYER } from "./systems/lifetime";
import { PHYSICS } from "./systems/physics";
import { PLAYER_INPUT } from "./systems/player_input";
import { PLAYER_MOVEMENT } from "./systems/player_movement";
import { PROJECTILE_SPAWNER } from "./systems/projectile_spawner";
import { RENDERER } from "./systems/renderer";

const world = world_create(COMPONENTS);

system_create(world, LIFETIME_DESTROYER);
system_create(world, PLAYER_INPUT);
system_create(world, ENEMY_MOVEMENT);
system_create(world, PLAYER_MOVEMENT);
system_create(world, ENEMY_SPAWNER);
system_create(world, PROJECTILE_SPAWNER);
system_create(world, PHYSICS);
system_create(world, ANIMATOR_SYSTEM);
system_create(world, RENDERER);

const player = entity_create(world);
component_set(world, player, POSITION, vector2_create());
component_set(world, player, VELOCITY, vector2_create());
component_set(world, player, INPUT, { dx: 0, dy: 0 })
component_set(world, player, COLLIDER, 1);
component_set(world, player, SPRITE, 0)
component_set(world, player, ANIMATOR, [0,0, 0]);
component_set(world, player, TAG_PLAYER, 1)

window.requestAnimationFrame(function tick(now) {
    window.requestAnimationFrame(tick)
    world_tick(world, now);
})
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        world_pause(world);
    } else {
        world_resume(world);
    }
}, false)