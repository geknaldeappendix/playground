const tags: Map<number, Set<number>> = new Map()

export function tag_set(
    entity_index: number,
    tag: number
) {
    tags.get(tag)?.add(entity_index);
}

export function tag_delete(
    entity_index: number,
    tag: number
) {
    tags.get(tag)?.delete(entity_index);
}
