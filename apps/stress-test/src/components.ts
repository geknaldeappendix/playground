import { Vector2 } from "@playground/math/vector2";

export type Position = Vector2;
export type Velocity = Vector2;
export type Sprite = number;

export enum Component {
    Position = 0,
    Velocity,
    Sprite,
    TAG_PLAYER,
    TAG_ENEMY
}

export type Components= {
    [Component.Position]: Position,
    [Component.Velocity]: Velocity,
    [Component.Sprite]: Sprite,
    [Component.TAG_PLAYER]: null,
    [Component.TAG_ENEMY]: null,
}