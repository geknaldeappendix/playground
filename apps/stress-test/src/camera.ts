import { Vector3, vector3_create } from "@playground/math/vector3";

export type Camera = {
    position: Vector3
}

export function
camera_create(): Camera {
    return {
        position: vector3_create(0, 0, 0),
    };
}

export const camera = camera_create()