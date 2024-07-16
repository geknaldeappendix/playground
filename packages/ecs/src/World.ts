import { BitMask, ComponentTypes, Components } from "./Components";
import { System } from "./System";

export type EntityId = number;

export class World<Types extends ComponentTypes> extends Components<Types> {
    private previous_tick = 0;
    private previous_second = 0;
    private tps = 0;

    private entities: Array<BitMask> = []
    private systems: Array<System<Types>> = [];

    public entity_create(): EntityId {
        const free = this.entities.indexOf(0);
        if (free !== -1) {
            this.entity_delete(free);
            return free;
        }
        return this.entities.push(0) - 1;
    }

    public entity_delete(entity_id: EntityId) {
        this.entities[entity_id] = 0;
        this.delete_index(entity_id);
    }

    public override set<Type extends keyof Types & number>(
        entity_id: number, 
        type: Type, 
        component: Types[Type]
    ) {
        const bit_mask = super.set(entity_id, type, component);
        this.entities[entity_id] |= bit_mask;
        return bit_mask;
    }

    public override delete<Type extends keyof Types & number>(
        entity_id: number, 
        type: Type
    ) {
        const bit_mask = super.delete(entity_id, type);
        this.entities[entity_id] ^= bit_mask;
        return bit_mask;
    }

    public query_create<Type extends keyof Types & number>(components: Type[]): BitMask {
        return components.reduce((bit_mask, index) => bit_mask | 1 << index, 0)
    }

    public query(query_bit_mask: BitMask): number[] {
        return this.entities.reduce<number[]>((result, bit_mask, i) => {
            if ((query_bit_mask & bit_mask) === query_bit_mask) {
                result.push(i)
            }
            return result
        }, [])
    }

    public system_push(system: System<Types>) {
        system.world = this;
        system.query = this.query_create(system.required_components);
        this.systems.push(system);
    }

    public tick(now: number) {
        this.tps++;
        const delta = now - this.previous_tick;

        this.systems.forEach(system => {
            system.accumulated_time += delta;

            const entities = this.query(system.query)

            system.render(delta, entities);

            if (system.interval === -1) return;

            if (system.interval === 0) {
                system.tick(delta, entities)
                system.accumulated_time = 0;
                return;
            }

            while (system.accumulated_time >= system.interval) {
                system.tick(system.interval, entities)
                system.accumulated_time -= system.interval;
            }
        });

        if (now - this.previous_second > 1000) {
            console.log(this.tps);
            this.tps = 0;
            this.previous_second = now;
        }

        this.previous_tick = now;
    }
}