import { component_get, component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { query } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { vector2_create } from "@playground/math/vector2";
import { POSITION, SPRITE, TAG_ENEMY, TAG_PLAYER, VELOCITY } from "../components";

const QUERY = 1 << TAG_PLAYER
const RADIUS = 200;

export const ENEMY_SPAWNER: System = {
    interval: 1000/10,

    tick(world) {
        const player = query(world, QUERY)[0];
        const position = component_get(world, player, POSITION);

        const angle = Math.random() * 2 * Math.PI;
        const random = vector2_create(
            position[0] + RADIUS * Math.cos(angle),
            position[1] + RADIUS * Math.sin(angle),
        )

        const enemy = entity_create(world);
        component_set(world, enemy, POSITION, random);
        component_set(world, enemy, VELOCITY, vector2_create());
        component_set(world, enemy, SPRITE, 4);
        component_set(world, enemy, TAG_ENEMY, 0);
    }
}