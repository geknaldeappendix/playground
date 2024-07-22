import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { Vector2, vector2_add, vector2_create, vector2_from, vector2_scale } from "@playground/math/vector2";
import { COLLIDER, POSITION, VELOCITY } from "../components";

const size = 16;
const rect2w = size, rect1w = size, rect2h = size, rect1h = size;

function aabb(a: Vector2, b: Vector2) {
    return (
        a[0] < b[0] + rect2w &&
        a[0] + rect1w > b[0] &&
        a[1] < b[1] + rect2h &&
        a[1] + rect1h > b[1]
    )

}

const QUERY = query_create([POSITION, VELOCITY, COLLIDER])

export const PHYSICS: System = {
    interval: 1000/30,

    tick(world, delta_time) {
        const entities = query(world, QUERY);

        for (const entity of entities) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);
            const delta = vector2_create();

            other: for (const other of entities) {
                if (entity === other) continue other;
                const other_position = component_get(world, other, POSITION);

                if (aabb(position, other_position)) {
                    vector2_from(velocity, vector2_create())
                }
            }

            vector2_scale(delta, velocity, delta_time)
            vector2_add(delta, position, delta);
            vector2_from(position, delta);
        }
    }
}