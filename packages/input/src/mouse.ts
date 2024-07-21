const mouse = {
    x: 0,
    y: 0,
    buttons: [false, false]
}

// function
// on_pointer_lock_change(
//     canvas: HTMLCanvasElement
// ): void {
//     if (document.pointerLockElement === canvas) {
//         canvas.onmousemove = (event) => on_mouse_move(event);
//     } else {
//         canvas.onmousemove = () => {};
//     }
// }

// function
// on_click(
//     canvas: HTMLCanvasElement
// ): void {
//     document.onpointerlockchange = () => on_pointer_lock_change(canvas);
//     (async () => canvas.requestPointerLock())();
// }

function
on_mouse_move(
    event: MouseEvent
): void {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}

function
on_mouse_down(
    event: MouseEvent
): void {
    mouse.buttons[event.button] = true;
}

function
on_mouse_up(
    event: MouseEvent
): void {
    mouse.buttons[event.button] = false;
}

export function mouse_down(
    button: number
): boolean {
    return mouse.buttons[button]
}

export function mouse_xy() {
    return [mouse.x, mouse.y]
}

document.body.oncontextmenu = (event) => event.preventDefault();
document.body.onmousemove = (event) => on_mouse_move(event);
document.body.onmousedown = (event) => on_mouse_down(event);
document.body.onmouseup = (event) => on_mouse_up(event);