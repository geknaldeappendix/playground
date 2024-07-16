import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { vector2_create } from "@playground/math/vector2";
import { Component, Components } from "../components";

export class MobSpawner extends System<Components> {
    public interval: number = 1000/10;
    public required_components = [];

    private i: number = 0

    public tick(delta: number, entities: EntityId[]): void {
        const mob = this.world.entity_create()
        const x = Math.floor(this.i % 36);
        const y = Math.floor(this.i / 36)
        this.world.set(mob, Component.Position, vector2_create(x, y))
        this.world.set(mob, Component.Sprite, this.i)
        this.i++;
    }
}