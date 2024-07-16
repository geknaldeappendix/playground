import { System } from "@playground/ecs/System";
import { Camera } from "@playground/engine/Camera";
import { Input } from "@playground/engine/Input";
import { Component, Components } from "../components";

export class CameraFollower extends System<Components> {
    public interval: number = 1000/10;
    public required_components: Component[] = []

    private speed = .01;
    private text = document.createElement('p')

    public constructor(
        private input: Input,
        private camera: Camera
    ) {
        super()
        this.text.style.position = 'absolute';
        this.text.style.left = '0';
        this.text.style.top = '0';
        document.body.appendChild(this.text)
    }

    public tick(delta: number, entities: number[]): void {
        const x = (this.input.key_down('a') ? 1 : 0) - (this.input.key_down('d') ? 1 : 0);
        const y = (this.input.key_down('s') ? 1 : 0) - (this.input.key_down('w') ? 1 : 0);

        this.camera.position[0] += x * delta * this.speed;
        this.camera.position[1] += y * delta * this.speed;

        this.text.innerHTML = this.camera.position[0] + ', ' + this.camera.position[1]
    }
}