import { component_get, component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { key_down } from "@playground/input/keyboard";
import { mouse_down, mouse_xy } from "@playground/input/mouse";
import { vector2_clone, vector2_create, vector2_normalize, vector2_scale, vector2_subtract } from "@playground/math/vector2";
import { camera } from "../camera";
import { INPUT, POSITION, SPRITE, TAG_PROJECTILE, VELOCITY } from "../components";

const QUERY = query_create([INPUT])

const SPEED = 60;
const PROJECTILE_SPEED = 40;
const COOLDOWN_RATE = 1000/10;

let time = 0;

export const PLAYER_INPUT: System = {
    interval: 0,

    tick(world, delta) {
        time += delta
        const player = query(world, QUERY)[0];
        const position = component_get(world, player, POSITION)
        const input = component_get(world, player, INPUT)

        input.dx = (key_down('d') ? 1 : 0) - (key_down('a') ? 1 : 0);
        input.dy = (key_down('w') ? 1 : 0) - (key_down('s') ? 1 : 0);

        // Move this to projectile spawner
        if (mouse_down(0)) {
            if (COOLDOWN_RATE < time * 1000) {
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
                component_set(world, projectile, SPRITE, 7);
                component_set(world, projectile, TAG_PROJECTILE, true);

                time = 0;
            }
        }
    }
}