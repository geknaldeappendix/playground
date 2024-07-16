export class Input {
    public mouse = {
        locked: false,
        x: -1,
        y: -1,
        buttons: [false, false, false],
        wheel: 0
    }

    public keys: Array<string> = new Array<string>()

    oncontextmenu(event: MouseEvent) {
        event.preventDefault()
    }

    onmousemove(event: MouseEvent) {
        this.mouse.x += event.movementX;
        this.mouse.y += event.movementY;
    }

    onpointerlockchange() {
        if (document.pointerLockElement === this.canvas) {
            this.mouse.locked = true;
            this.canvas.onmousemove = this.onmousemove.bind(this);
        } else {
            this.mouse.locked = false;
            this.canvas.onmousemove = () => {};
        }
    }

    onclick() {
        if (this.mouse.locked) return;
        document.onpointerlockchange = this.onpointerlockchange.bind(this);
        (async () => this.canvas.requestPointerLock())();
    }

    onmousedown(event: MouseEvent) {
        this.mouse.buttons[event.button] = true;
    }

    onmouseup(event: MouseEvent) {
        this.mouse.buttons[event.button] = false;
    }

    onwheel(event: WheelEvent) {
        this.mouse.wheel += event.deltaY
    }

    onkeydown(event: KeyboardEvent) {
        if (!this.keys.includes(event.key)) {
            this.keys.push(event.key);
        }
    }

    onkeyup(event: KeyboardEvent) {
        this.keys.splice(this.keys.indexOf(event.key), 1);
    }

    public constructor(private canvas: HTMLCanvasElement) {
        canvas.oncontextmenu = this.oncontextmenu.bind(this);
        canvas.onclick = this.onclick.bind(this);
        canvas.onmousedown = this.onmousedown.bind(this);
        canvas.onmouseup = this.onmouseup.bind(this);
        document.body.onwheel = this.onwheel.bind(this)
        document.body.onkeydown = this.onkeydown.bind(this);
        document.body.onkeyup = this.onkeyup.bind(this);
    }

    public key_down(key: string) {
        return this.keys.includes(key)
    }
}