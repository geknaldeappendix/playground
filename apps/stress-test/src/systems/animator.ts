import { component_get, component_set } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { ANIMATOR, SPRITE, VELOCITY } from "../components";

const QUERY = query_create([SPRITE, ANIMATOR])

const w = 36;

const animation = [0, 1, 2]

export const ANIMATOR_SYSTEM: System = {
    interval: 1000/8,
    tick(world, delta, now) {
        const entities = query(world, QUERY);

        for (const entity of entities) {
            const sprite = component_get(world, entity, SPRITE);
            const animator = component_get(world, entity, ANIMATOR);
            if (animator[2] === -1) animator[2] = sprite;
            const velocity = component_get(world, entity, VELOCITY);

            if (animator[1] - now < 1000) {
                animator[0] = animation[(animator[0] + 1) % 3];
                animator[1] = now + 1000;
            }

            const dir = velocity[0] > velocity[1] ? 1 : 0;
            const new_sprite = (dir * w) + animation[animator[0]] + animator[2];

            component_set(world, entity, SPRITE, new_sprite)
        }
    }
}