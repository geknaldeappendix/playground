import { _entity_internal_delete } from "./entity";
import { System } from "./system";

export type World = {
    components: Map<number, any[]>
    entities: number[]
    entities_to_delete: number[]
    tags: Map<number, number[]>
    systems: (System & { accumulated_time: number, interval: number })[]
}

export function world_create(
    component_indexes: number[]
): World {
    return {
        components: new Map<number, any[]>(component_indexes.map(index => ([1 << index, []]))),
        entities: [],
        entities_to_delete: [],
        tags: new Map(),
        systems: []
    }
}

let tps = 0,
    previous_tick = 0,
    previous_second = 0;

export function world_tick(
    world: World,
    now: number
) {
    tps++;
    const delta = now - previous_tick;

    for (const system of world.systems) {
        system.accumulated_time += delta;

        system.render && system.render(world, delta, now)

        if (system.interval === -1 || !system.tick) continue;

        if (system.interval === 0) {
            system.tick(world, delta / 1000, now)
            system.accumulated_time = 0;
            continue;
        }

        while (system.accumulated_time >= system.interval) {
            system.tick(world, system.interval / 1000, now)
            system.accumulated_time -= system.interval;
        }
    }

    while (world.entities_to_delete.length > 0) {
        const entity = world.entities_to_delete.pop()!
        _entity_internal_delete(world, entity)
    }

    if (now - previous_second > 1000) {
        console.log(tps);
        tps = 0;
        previous_second = now;
    }

    previous_tick = now;
}
