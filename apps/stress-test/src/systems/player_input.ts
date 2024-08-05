import { component_get, component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { key_down } from "@playground/input/keyboard";
import { mouse_down, mouse_xy } from "@playground/input/mouse";
import { vector2_clone, vector2_create, vector2_normalize, vector2_scale, vector2_subtract } from "@playground/math/vector2";
import { camera } from "../camera";
import { COLLIDER, INPUT, LIFETIME, POSITION, SPRITE, TAG_PROJECTILE, VELOCITY } from "../components";

const QUERY = query_create([INPUT])

const PROJECTILE_SPEED = 240;
const COOLDOWN_RATE = 1;
let next_shot = 0;

export const PLAYER_INPUT: System = {
    interval: 0,

    tick(world, _, now) {
        const player = query(world, QUERY)[0];
        const position = component_get(world, player, POSITION)
        const input = component_get(world, player, INPUT)

        input.dx = (key_down('KeyD') ? 1 : 0) - (key_down('KeyA') ? 1 : 0);
        input.dy = (key_down('KeyW') ? 1 : 0) - (key_down('KeyS') ? 1 : 0);
        input.sprint = key_down('ShiftLeft');
        
        // Move this to projectile spawner
        if (mouse_down(0)) {
            if (next_shot < now) {
                const mouse = vector2_create(...mouse_xy())
                const input = vector2_subtract(mouse, mouse, camera.position);

                const direction = vector2_create();
                vector2_subtract(direction, input, position);
                vector2_normalize(direction, direction);
                direction[1] = -direction[1]
                vector2_scale(direction, direction, PROJECTILE_SPEED)

                const projectile = entity_create(world);
                component_set(world, projectile, POSITION, vector2_clone(position));
                component_set(world, projectile, VELOCITY, direction);
                component_set(world, projectile, COLLIDER, 1)
                component_set(world, projectile, SPRITE, 7);
                component_set(world, projectile, TAG_PROJECTILE, 1);
                component_set(world, projectile, LIFETIME, now + 10000);

                next_shot = now + COOLDOWN_RATE;
            }
        }
    }
}