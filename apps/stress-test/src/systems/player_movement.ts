import { component_get } from "@playground/ecs/component";
import { query, query_create } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { INPUT, TAG_PLAYER, VELOCITY } from "../components";

const QUERY = query_create([VELOCITY, INPUT, TAG_PLAYER])
const SPEED = 60;

export const PLAYER_MOVEMENT: System  = {
    interval: 0,

    tick(world) {
        const player = query(world, QUERY)[0];
        const input = component_get(world, player, INPUT)
        const velocity = component_get(world, player, VELOCITY)

        velocity[0] = input.dx * SPEED;
        velocity[1] = input.dy * SPEED;
    }
}