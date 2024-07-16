import { System } from "@playground/ecs/System";
import { Camera } from "@playground/engine/Camera";
import { Input } from "@playground/engine/Input";
import { Component, Components } from "../components";

export class CameraFollower extends System<Components> {
    public interval: number = 0;
    public required_components: Component[] = []

    private text = document.createElement('p')

    public constructor(
        private camera: Camera,
        private input: Input,
        private player_id: number
    ) {
        super()
        this.text.style.position = 'absolute';
        this.text.style.left = '0';
        this.text.style.top = '0';
        document.body.appendChild(this.text)
    }

    public tick(delta: number, entities: number[]): void {
        const position = this.world.get(this.player_id, Component.Position)!;

        this.camera.position[0] = this.camera.canvas.width / 2 - position[0];
        this.camera.position[1] = this.camera.canvas.height / 2 - position[1];
        this.camera.position[2] = 1;

        this.camera.position[2] = Math.max(1, this.input.mouse.wheel / 120);

        this.text.innerHTML = this.camera.position[0] + ' | ' + this.camera.position[1] + ' | ' + this.camera.position[2]
    }
}