import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { vector2_add, vector2_create, vector2_scale } from "@playground/math/vector2";
import { POSITION, VELOCITY } from "../components";

const QUERY = query_create([POSITION, VELOCITY])

export const PHYSICS: System = {
    interval: 1000/30,

    tick(world, delta_time) {
        const entities = query(world, QUERY);

        for (const entity of entities) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);
            const delta = vector2_create();
            vector2_scale(delta, velocity, delta_time)
            vector2_add(position, position, delta);
        }
    }
}