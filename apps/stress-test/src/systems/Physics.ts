import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { Component, Components } from "../components";

export class Physics extends System<Components> {
    public interval: number = 1000/30
    public required_components: Component[] = [Component.Position]

    public tick(delta: number, entities: EntityId[]): void {
        
    }
}