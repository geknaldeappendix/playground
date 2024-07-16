import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { Component, Components } from "../components";

export class Physics extends System<Components> {
    public interval: number = 0
    public required_components: Component[] = [Component.Position, Component.Velocity]

    public tick(delta: number, entities: EntityId[]): void {
        entities.forEach(id => {
            const position = this.world.get(id, Component.Position)!;
            const velocity = this.world.get(id, Component.Velocity)!;

            position[0] = position[0] + velocity[0];
            position[1] = position[1] + velocity[1];
        })
    }
}