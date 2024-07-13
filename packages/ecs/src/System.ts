export abstract class System {
    public abstract interval: number;

    public accumulated_time = 0;

    public abstract tick(delta: number): void;
}