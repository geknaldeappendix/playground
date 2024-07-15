import { BitMask, ComponentTypes } from "./Components";
import { EntityId, World } from "./World";

export abstract class System<Types extends ComponentTypes> {
    public abstract interval: number;
    public abstract required_components: (keyof Types & number)[];

    public world: World<Types> = {} as World<Types>; //set by world
    public query: BitMask = 0; //set by world

    public accumulated_time = 0;

    public tick(delta: number, entities: EntityId[]): void {};
    public render(delta: number, entities: EntityId[]): void {};
}