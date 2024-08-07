import { component_get } from "@playground/ecs/component";
import { System } from "@playground/ecs/system";
import { tag_query } from "@playground/ecs/tag";
import { INPUT, VELOCITY } from "../components";
import { PLAYER } from "../tags";

const SPEED = 120;

export const PLAYER_MOVEMENT: System  = {
    interval: 0,

    tick(world) {
        const player = tag_query(world, PLAYER)[0]; //TODO:
        const input = component_get(world, player, INPUT)
        const velocity = component_get(world, player, VELOCITY)

        let speed = SPEED;
        if (input.sprint) {
            speed *= 2;
        }

        velocity[0] = input.dx * speed;
        velocity[1] = input.dy * speed;
    }
}