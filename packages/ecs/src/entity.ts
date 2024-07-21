import { World } from "./world";

export function entity_delete(
    world: World,
    entity_index: number,
) {
    world.entities[entity_index] = 0;
    world.components.forEach(components => delete components[entity_index])
}

export function entity_create(
    world: World
): number {
    const free = world.entities.indexOf(0);
    if (free !== -1) {
        entity_delete(world, free);
        return free;
    }
    return world.entities.push(0) - 1;
}