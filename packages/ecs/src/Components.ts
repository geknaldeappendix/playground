export type Component = any;
export type BitMask = number;

export type ComponentTypes = Record<number, Component>;

const ERROR_COMPONENT_NOT_REGISTERED = new Error('ERROR_COMPONENT_NOT_REGISTERED');

export class Components<Types extends ComponentTypes> {
    private components = new Map<BitMask, Array<Component>>();

    public constructor(types: ComponentTypes) {
        Object.values(types).forEach(type => {
            if (typeof type !== 'number') return;
            const bit_mask = 1 << type;
            this.components.set(bit_mask, new Array());
        })
    }

    private get_components(bit_mask: BitMask): Array<Component> {
        const components = this.components.get(bit_mask);
        if (components === undefined) {
            throw ERROR_COMPONENT_NOT_REGISTERED;
        }
        return components;
    }

    public set<Type extends keyof Types & number>(
        index: number, 
        type: Type, 
        component: Types[Type]
    ): BitMask {
        const bit_mask = 1 << type;
        this.get_components(bit_mask)[index] = component;
        return bit_mask;
    }

    public get<Type extends keyof Types & number>(
        index: number, 
        type: Type
    ): Types[Type] | undefined {
        const bit_mask = 1 << type;
        return this.get_components(bit_mask)![index];
    }

    // TODO: check if can change the array length accordingly to reserve more storage?
    public delete<Type extends keyof Types & number>(
        index: number,
        type: Type
    ): number {
        const bit_mask = 1 << type;
        delete this.get_components(bit_mask)[index];
        return bit_mask
    }

    public delete_index(index: number) {
        this.components.forEach(components => delete components[index])
    }
}