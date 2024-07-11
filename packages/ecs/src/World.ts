import { BitMask, ComponentTypes, Components } from "./Components";

export type EntityId = number;

export class World<Types extends ComponentTypes> extends Components<Types> {
    private entities: Array<BitMask> = []

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
}