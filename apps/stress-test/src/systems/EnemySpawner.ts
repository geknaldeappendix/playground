import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { vector2_create } from "@playground/math/vector2";
import { Component, Components } from "../components";

function getRandomLocationAround(centerX: number, centerY: number, radius: number) {
    // Generate a random angle between 0 and 2π
    const angle = Math.random() * 2 * Math.PI;

    // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return vector2_create(x, y);
}

export class EnemySpawnerSystem extends System<Components> {
    public interval: number = 1000/10;
    public required_components = [];

    private flag: number = 0

    public constructor(
        private player_id: number
    ) {
        super();
        
    }

    public tick(delta: number, entities: EntityId[]): void {
        const player_position = this.world.get(this.player_id, Component.Position)!;
        const position = getRandomLocationAround(player_position[0], player_position[1], 200)

        const mob = this.world.entity_create()
        this.world.set(mob, Component.Position, position);
        this.world.set(mob, Component.Sprite, 0);
        this.world.set(mob, Component.TAG_ENEMY, null);
        this.world.set(mob, Component.Velocity, vector2_create(0, 0));
    }
}