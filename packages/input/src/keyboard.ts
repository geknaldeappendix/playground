export type Keyboard = {
    keys: string[]
}

const keyboard: Keyboard = {
    keys: []
}

function on_key_down(
    event: KeyboardEvent
): void {
    event.preventDefault();
    if (!keyboard.keys.includes(event.code)) {
        keyboard.keys.push(event.code);
    }
}

function on_key_up(
    event: KeyboardEvent
): void {
    keyboard.keys.splice(keyboard.keys.indexOf(event.code), 1);
}

export function key_down(
    code: string
): boolean {
    return keyboard.keys.includes(code);
}

document.body.onkeydown = (event) => on_key_down(event);
document.body.onkeyup = (event) => on_key_up(event);