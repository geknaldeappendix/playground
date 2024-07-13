import { Vector2 } from "@playground/math/vector2";

export type Position = Vector2;
export type Velocity = Vector2;
export type Sprite = string;

export enum ComponentType {
    Position = 0,
    Velocity,
    Sprite,
}

export type ComponentMap = {
    [ComponentType.Position]: Position,
    [ComponentType.Velocity]: Velocity,
    [ComponentType.Sprite]: Sprite,
}