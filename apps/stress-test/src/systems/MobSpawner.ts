import { System } from "@playground/ecs/System";
import { EntityId } from "@playground/ecs/World";
import { random } from "@playground/math/random";
import { vector2_create } from "@playground/math/vector2";
import { Component, Components } from "../components";

export class MobSpawner extends System<Components> {
    public interval: number = 1000/1;
    public required_components = [];

    public tick(delta: number, entities: EntityId[]): void {
        const mob = this.world.entity_create()
        // this.world.set(mob, Component.Position, vector2_create(Math.random() * 100, Math.random() * 100))
        this.world.set(mob, Component.Position, vector2_create(0, 0))
        this.world.set(mob, Component.Sprite, random(0, 8))
    }
}