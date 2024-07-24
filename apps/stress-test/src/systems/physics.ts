import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { Vector2, vector2_add, vector2_create, vector2_dot, vector2_from, vector2_lerp, vector2_scale, vector2_subtract } from "@playground/math/vector2";
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

function line_intersect(
    a_position: Vector2, a_new_position: Vector2,
    b_position: Vector2, b_new_position: Vector2,
    a_size = vector2_create(16, 16), b_size = vector2_create(16, 16)
) {
    const velocity_a = vector2_subtract(vector2_create(), a_new_position, a_position);
    const velocity_b = vector2_subtract(vector2_create(), b_new_position, b_position);

    const relative_velocity = vector2_subtract(vector2_create(), velocity_b, velocity_a);

    let t_near = vector2_create(-Infinity, -Infinity);
    let t_far = vector2_create(Infinity, Infinity);

    for (let i = 0; i < 2; i++) {
        if (relative_velocity[i] === 0) {
            if (a_position[i] + a_size[i] < b_position[i] || a_position[i] > b_position[i] + b_size[i]) {
                return null;
            }
        } else {
            let t1 = (b_position[i] - a_size[i] - a_position[i]) / relative_velocity[i];
            let t2 = (b_position[i] + b_size[i] - a_position[i]) / relative_velocity[i];

            if (t1 > t2) {
                [t1, t2] = [t2, t1];
            }

            t_near[i] = Math.max(t_near[i], t1);
            t_far[i] = Math.min(t_far[i], t2);

            if (t_near[i] > t_far[i] || t_far[i] < 0) {
                return null;
            }
        }
    }

    const collision_time = Math.max(t_near[0], t_near[1]);

    if (collision_time <= 1) {
        // Calculate collision normal
        const normal = vector2_create();
        if (t_near[0] > t_near[1]) {
            normal[0] = relative_velocity[0] < 0 ? 1 : -1;
            normal[1] = 0;
        } else {
            normal[0] = 0;
            normal[1] = relative_velocity[1] < 0 ? 1 : -1;
        }

        return { time: collision_time, normal: normal };
    }

    return null;
}


const QUERY = query_create([POSITION, VELOCITY, COLLIDER])

export const PHYSICS: System = {
    interval: 1000/30,

    tick(world, delta_time) {
        const entities = query(world, QUERY);

        const new_positions = new Map();

        for (const entity of entities) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);

            const new_position = vector2_create();
            vector2_scale(new_position, velocity, delta_time)
            vector2_add(new_position, new_position, position);
            new_positions.set(entity, new_position);
        }

        for (const [entity, new_position] of new_positions) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);
    
            for (const [other, other_new_position] of new_positions) {
                if (entity === other) continue;
    
                const other_position = component_get(world, other, POSITION);
    
                // Check if paths intersect
                const collision_result = line_intersect(
                    position, new_position,
                    other_position, other_new_position,
                );
    
                if (collision_result !== null) {
                    const { time, normal } = collision_result;
    
                    // Calculate collision point
                    const collision_point = vector2_create();
                    vector2_lerp(collision_point, position, new_position, time);
    
                    // Move to collision point
                    vector2_from(position, collision_point);
    
                    // Reflect velocity based on collision normal
                    const dot = vector2_dot(velocity, normal);
                    const reflection = vector2_create();
                    vector2_scale(reflection, normal, 2 * dot);
                    vector2_subtract(velocity, velocity, reflection);
    
                    // Apply coefficient of restitution (bounciness)
                    const restitution = 0.5; // Adjust this value between 0 and 1
                    vector2_scale(velocity, velocity, restitution);
    
                    // Apply a small separation to prevent sticking
                    const separation = vector2_create();
                    vector2_scale(separation, normal, 0.000000000001); // Adjust this small value as needed
                    vector2_add(position, position, separation);
    
                    // Update new position
                    vector2_scale(new_position, velocity, delta_time * (1 - time));
                    vector2_add(new_position, new_position, position);
                    new_positions.set(entity, new_position);
    
                    break; // Handle one collision at a time
                }
            }
        }

        for (const [entity, new_position] of new_positions) {
            const position = component_get(world, entity, POSITION);
            vector2_from(position, new_position);
        }

            // other: for (const other of entities) {
            //     if (entity === other) continue other;
            //     const other_position = component_get(world, other, POSITION);

            //     if (aabb(position, other_position)) {
            //     }
            // }

            // const delta = vector2_create();
            // vector2_scale(delta, velocity, delta_time)
            // vector2_add(delta, position, delta);
            // vector2_from(position, delta);
    }
}