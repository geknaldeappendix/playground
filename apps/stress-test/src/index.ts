import { World } from "@playground/ecs/World";
import { vector2_create } from "@playground/math/vector2";
import { ComponentMap, ComponentType } from "./components";

const world = new World<ComponentMap>(ComponentType);

const player = world.entity_create();

world.set(player, ComponentType.Position, vector2_create());
world.set(player, ComponentType.Velocity, vector2_create());
world.set(player, ComponentType.Sprite, "player1");

console.log(world);

(function tick(now: number) {
    window.requestAnimationFrame(tick)

    
})(0);