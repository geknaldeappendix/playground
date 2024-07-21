const keys: string[] = []

function on_key_down(
    event: KeyboardEvent
): void {
    if (!keys.includes(event.key)) {
        keys.push(event.key);
    }
}

function on_key_up(
    event: KeyboardEvent
): void {
    keys.splice(keys.indexOf(event.key), 1);
}

export function key_down(
    key: string
): boolean {
    return keys.includes(key);
}

document.body.onkeydown = (event) => on_key_down(event);
document.body.onkeyup = (event) => on_key_up(event);