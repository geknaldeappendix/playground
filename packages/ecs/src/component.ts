import { World } from "./world";

export function component_set(
    world: World,
    entity_index: number,
    component_index: number,
    component: any
) {
    const bit_mask = 1 << component_index;
    world.entities[entity_index] |= bit_mask;
    world.components.get(bit_mask)![entity_index] = component;
}

export function component_has(
    world: World,
    entity_index: number,
    component_index: number
): boolean {
    const bit_mask = 1 << component_index;
    return (bit_mask & world.entities[entity_index]) === bit_mask;
}

export function component_get(
    world: World,
    entity_index: number,
    component_index: number
): any {
    const bit_mask = 1 << component_index;
    return world.components.get(bit_mask)![entity_index];
}

export function component_delete(
    world: World,
    entity_index: number,
    component_index: number
) {
    const bit_mask = 1 << component_index;
    world.entities[entity_index] &= ~bit_mask;
    delete world.components.get(bit_mask)![entity_index];
}