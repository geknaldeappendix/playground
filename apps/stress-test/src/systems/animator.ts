import { component_delete, component_get, component_set } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { Vector2 } from "@playground/math/vector2";
import { ANIMATOR, FLIP_X, SPRITE, VELOCITY } from "../components";

const QUERY = query_create([SPRITE, ANIMATOR])

const w = 36;

const animation = [0, 1, 2]

function direction_get(velocity: Vector2): number {
    const angle = Math.atan2(velocity[0], velocity[1]);
    const deg = angle * (180 / Math.PI);

    if (-45 <= deg && deg <= 45) return 0;
    if (45 <= deg && deg <= 135) return 2;
    if (-135 <= deg && deg <= -45) return 3;
    return 1
}

export const ANIMATOR_SYSTEM: System = {
    interval: 1000/16,
    tick(world, _, now) {
        const entities = query(world, QUERY);

        for (const entity of entities) {
            const sprite = component_get(world, entity, SPRITE);
            const animator = component_get(world, entity, ANIMATOR);
            if (animator[2] === -1) animator[2] = sprite;
            const velocity = component_get(world, entity, VELOCITY);

            if (velocity[0] === 0 && velocity[1] === 0) {
                component_set(world, entity, SPRITE, animator[2] + w);
                continue;
            }

            if (animator[1] - now < 1000) {
                animator[0] = animation[(animator[0] + 1) % 3];
                animator[1] = now + 1000;
            }
            
            // TODO: test if tags are faster
            let direction = direction_get(velocity);
            if (direction === 3) {
                direction = 2;
                component_set(world, entity, FLIP_X, true);
            } else {
                component_delete(world, entity, FLIP_X);
            }
            const new_sprite = (direction * w) + animation[animator[0]] + animator[2];

            component_set(world, entity, SPRITE, new_sprite)
        }
    }
}