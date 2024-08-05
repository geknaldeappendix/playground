import { _entity_internal_delete } from "./entity";
import { System } from "./system";

export type World = {
    now: number
    previous_tick: number
    previous_second: number
    tps: number
    paused: boolean

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
        now: 0,
        previous_tick: 0,
        previous_second: 0,
        tps: 0,
        paused: false,
        components: new Map<number, any[]>(component_indexes.map(index => ([1 << index, []]))),
        entities: [],
        entities_to_delete: [],
        tags: new Map(),
        systems: []
    }
}

export function world_tick(
    world: World,
    now: number
) {
    world.now = now;

    world.tps++;
    const delta = now - world.previous_tick;
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

    if (now - world.previous_second > 1000) {
        console.log(world.tps);
        world.tps = 0;
        world.previous_second = now;
    }

    world.previous_tick = now;
}

export function world_pause(
    world: World
) {
    world.paused = true;
}

export function world_resume(
    world: World
) {
    //TODO: maybe calc last frame before pause?
    const now = performance.now();
    world.now = now;
    world.previous_tick = now;
    world.previous_second = now;
    world.paused = false;
}