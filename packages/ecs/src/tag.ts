import { World } from "./world";

export function tag_set(
    world: World,
    entity_index: number,
    tag: number
) {
    const bit_mask = 1 << tag;
    world.tags[entity_index] |= bit_mask;
}

export function tag_delete(
    world: World,
    entity_index: number,
    tag: number
) {
    const bit_mask = 1 << tag;
    world.tags[entity_index] &= ~bit_mask;
}

export function _tag_internal_delete(
    world: World,
    entity_index: number,
) {
    world.tags[entity_index] = 0;
}

// TODO: move to query?
export function tag_query(
    world: World,
    query: number
): number[] {
    const q = 1 << query
    return world.tags.reduce<number[]>((result, bit_mask, i) => {
        if ((q & bit_mask) === q) {
            result.push(i)
        }
        return result
    }, [])
}

export function tag_has(
    world: World,
    entity: number,
    tag: number
): boolean {
    const bit_mask = 1 << tag;
    return (bit_mask & world.tags[entity]) === bit_mask;
}