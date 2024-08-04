import { component_get, component_has } from "@playground/ecs/component";
import { entity_delete } from "@playground/ecs/entity";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { Vector2, vector2_add, vector2_create, vector2_from, vector2_scale } from "@playground/math/vector2";
import { COLLIDER, POSITION, TAG_ENEMY, TAG_PLAYER, TAG_PROJECTILE, VELOCITY } from "../components";

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

// function line_intersect(
//     a_position: Vector2, a_new_position: Vector2,
//     b_position: Vector2, b_new_position: Vector2,
//     a_size = vector2_create(16, 16), b_size = vector2_create(16, 16)
// ) {
//     const velocity_a = vector2_subtract(vector2_create(), a_new_position, a_position);
//     const velocity_b = vector2_subtract(vector2_create(), b_new_position, b_position);

//     const relative_velocity = vector2_subtract(vector2_create(), velocity_b, velocity_a);

//     let t_near = vector2_create(-Infinity, -Infinity);
//     let t_far = vector2_create(Infinity, Infinity);

//     for (let i = 0; i < 2; i++) {
//         if (relative_velocity[i] === 0) {
//             if (a_position[i] + a_size[i] < b_position[i] || a_position[i] > b_position[i] + b_size[i]) {
//                 return null;
//             }
//         } else {
//             let t1 = (b_position[i] - a_size[i] - a_position[i]) / relative_velocity[i];
//             let t2 = (b_position[i] + b_size[i] - a_position[i]) / relative_velocity[i];

//             if (t1 > t2) {
//                 [t1, t2] = [t2, t1];
//             }

//             t_near[i] = Math.max(t_near[i], t1);
//             t_far[i] = Math.min(t_far[i], t2);

//             if (t_near[i] > t_far[i] || t_far[i] < 0) {
//                 return null;
//             }
//         }
//     }

//     const collision_time = Math.max(t_near[0], t_near[1]);

//     if (collision_time <= 1) {
//         // Calculate collision normal
//         const normal = vector2_create();
//         if (t_near[0] > t_near[1]) {
//             normal[0] = relative_velocity[0] < 0 ? 1 : -1;
//             normal[1] = 0;
//         } else {
//             normal[0] = 0;
//             normal[1] = relative_velocity[1] < 0 ? 1 : -1;
//         }

//         return { time: collision_time, normal: normal };
//     }

//     return null;
// }


const QUERY = query_create([POSITION, VELOCITY, COLLIDER])

export const PHYSICS: System = {
    interval: 1000/60,

    tick(world, delta_time) {
        const entities = query(world, QUERY);

        self: for (const entity of entities) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);

            const delta = vector2_create();
            vector2_scale(delta, velocity, delta_time)
            vector2_add(delta, position, delta);
            vector2_from(position, delta);

            if (component_has(world, entity, TAG_PROJECTILE)) {
                other: for (const other of entities) {
                    if (entity === other) continue other;
                    if (!component_has(world, other, TAG_ENEMY)) continue other;
                    
                    const other_position = component_get(world, other, POSITION);
    
                    if (aabb(position, other_position)) {
                        entity_delete(world, other);
                        entity_delete(world, entity);
                        continue self;
                    }
                }
            }

            if (component_has(world, entity, TAG_PLAYER)) {
                other: for (const other of entities) {
                    if (entity === other) continue other;
                    if (!component_has(world, other, TAG_ENEMY)) continue other;
                    
                    const other_position = component_get(world, other, POSITION);
    
                    if (aabb(position, other_position)) {
                        entity_delete(world, other);
                    }
                }
            }
        }
    }
}