import { Vector2 } from "@playground/math/vector2";

export type Position = Vector2;
export type Velocity = Vector2;
export type Sprite = string;

export enum ComponentType {
    Position = 0,
    Velocity,
    Sprite,
}

// export enum ExtendedComponentType {
//     Position = LAST_COMPONENT_TYPE + 1,
//     Velocity = LAST_COMPONENT_TYPE + 2,
//     Sprite = LAST_COMPONENT_TYPE + 3,
// }

// export const ComponentType = {...BaseComponentType, ...ExtendedComponentType};
// export type ComponentType = BaseComponentType | ExtendedComponentType;

export type ComponentMap = {
    [ComponentType.Position]: Position,
    [ComponentType.Velocity]: Velocity,
    [ComponentType.Sprite]: Sprite,
}