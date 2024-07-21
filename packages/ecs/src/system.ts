import { World } from "./world";

export type System = {
    interval?: number
    init?(world: World): Promise<void>
    tick?(world: World, delta: number): void
    render?(world: World, delta: number): void
}

export async function system_create(
    world: World,
    system: System
) {
    system.init && await system.init(world);
    const interval = (system.interval === undefined) ? -1 : system.interval;
    world.systems.push({ 
        ...system, 
        accumulated_time: 0, 
        interval,
    });
}