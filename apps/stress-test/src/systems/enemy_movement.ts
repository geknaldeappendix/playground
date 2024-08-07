import { component_get } from "@playground/ecs/component";
import { System } from "@playground/ecs/system";
import { tag_query } from "@playground/ecs/tag";
import { vector2_create, vector2_from, vector2_normalize, vector2_scale, vector2_subtract } from "@playground/math/vector2";
import { POSITION, VELOCITY } from "../components";
import { ENEMY, PLAYER } from "../tags";

const ENEMY_SPEED = 30

export const ENEMY_MOVEMENT: System = {
    interval: 1000/10,

    tick(world, delta) {
        const player = tag_query(world, PLAYER)[0]; //TODO:
        const player_position = component_get(world, player, POSITION);
        
        const entities = tag_query(world, ENEMY);
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