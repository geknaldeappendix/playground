import { component_get, component_set } from "@playground/ecs/component";
import { entity_create } from "@playground/ecs/entity";
import { System } from "@playground/ecs/system";
import { tag_query, tag_set } from "@playground/ecs/tag";
import { vector2_create } from "@playground/math/vector2";
import { ANIMATOR, COLLIDER, POSITION, SPRITE, VELOCITY } from "../components";
import { ENEMY, PLAYER } from "../tags";

const RADIUS = 200;

export const ENEMY_SPAWNER: System = {
    interval: 1000/100,

    tick(world) {
        const player = tag_query(world, PLAYER)[0]; //TODO:
        const position = component_get(world, player, POSITION);

        const angle = Math.random() * 2 * Math.PI;
        const random = vector2_create(
            position[0] + RADIUS * Math.cos(angle),
            position[1] + RADIUS * Math.sin(angle),
        )

        const enemy = entity_create(world);
        tag_set(world, enemy, ENEMY)
        component_set(world, enemy, POSITION, random);
        component_set(world, enemy, VELOCITY, vector2_create());
        component_set(world, enemy, SPRITE, 3);
        component_set(world, enemy, ANIMATOR, [0, 0, -1]);
        component_set(world, enemy, COLLIDER, 1);
    }
}