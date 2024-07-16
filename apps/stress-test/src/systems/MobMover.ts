import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { vector2_add, vector2_create, vector2_normalize, vector2_scale, vector2_subtract } from "@playground/math/vector2";
import { Component, Components } from "../components";

export class MobMover extends System<Components> {
    public interval: number = 1000/30;
    public required_components = [Component.TAG_ENEMY, Component.Position, Component.Velocity];

    public constructor(
        private player_id: number
    ) {
        super();
        
    }

    public tick(delta: number, entities: EntityId[]): void {
        const player_position = this.world.get(this.player_id, Component.Position)!;

        entities.forEach(id => {
            const position = this.world.get(id, Component.Position)!;
            const delta_vector = vector2_create();
            vector2_subtract(delta_vector, player_position, position);
            vector2_normalize(delta_vector, delta_vector)
            vector2_scale(delta_vector, delta_vector, delta)
            vector2_scale(delta_vector, delta_vector, 0.01)
            vector2_add(position, position, delta_vector)
        })
    }
}