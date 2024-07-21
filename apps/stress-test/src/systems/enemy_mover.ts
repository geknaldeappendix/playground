import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { vector2_create, vector2_from, vector2_normalize, vector2_scale, vector2_subtract } from "@playground/math/vector2";
import { POSITION, TAG_ENEMY, TAG_PLAYER, VELOCITY } from "../components";

const QUERY = query_create([POSITION, VELOCITY, TAG_ENEMY])
const QUERY_PLAYER = query_create([POSITION, TAG_PLAYER])

const ENEMY_SPEED = 30

export const ENEMY_MOVER: System = {
    interval: 1000/10,

    tick(world, delta) {
        const player = query(world, QUERY_PLAYER)[0];
        const player_position = component_get(world, player, POSITION);
        
        const entities = query(world, QUERY);
        for (const entity of entities) {
            const position = component_get(world, entity, POSITION);
            const velocity = component_get(world, entity, VELOCITY);

            const delta_vector = vector2_create();
            vector2_subtract(delta_vector, player_position, position);
            vector2_normalize(delta_vector, delta_vector)
            vector2_scale(delta_vector, delta_vector, ENEMY_SPEED)
            vector2_from(velocity, delta_vector)
        }
    }
}