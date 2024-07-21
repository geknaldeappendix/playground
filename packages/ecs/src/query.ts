import { World } from "./world";

export function query_create(
    component_indexes: number[]
): number {
    return component_indexes.reduce((bit_mask, index) => bit_mask | 1 << index, 0)
}

export function query(
    world: World,
    query: number
): number[] {world
    return world.entities.reduce<number[]>((result, bit_mask, i) => {
        if ((query & bit_mask) === query) {
            result.push(i)
        }
        return result
    }, [])
}