import { System } from "@playground/ecs/System";
import { Input } from "@playground/engine/Input";
import { Component, Components } from "../components";

export class PlayerInputSystem extends System<Components> {
    public interval: number = 0;
    public required_components: Component[] = []

    private speed = 1/8;

    public constructor(
        private input: Input,
        private player_id: number
    ) {
        super();
    }

    public tick(delta: number, entities: number[]): void {
        const x = (this.input.key_down('d') ? 1 : 0) - (this.input.key_down('a') ? 1 : 0);
        const y = (this.input.key_down('w') ? 1 : 0) - (this.input.key_down('s') ? 1 : 0);

        const position = this.world.get(this.player_id, Component.Position)!;
        const velocity = this.world.get(this.player_id, Component.Velocity)!;

        velocity[0] = x * delta * this.speed;
        velocity[1] = y * delta * this.speed;
    }
}