import { Vector3 } from "./vector3";

export type Quaternion = Float32Array;

export function
quaternion_create(): Quaternion {
    const quaternion = new Float32Array(4);
    quaternion[0] = 0;
    quaternion[1] = 0;
    quaternion[2] = 0;
    quaternion[3] = 1;
    return quaternion;
}

export function
quaternion_euler(
    out: Quaternion,
    vector3: Vector3
): Quaternion {
    const half_to_rad = (0.5 * Math.PI) / 180.0;
    const x = vector3[0] * half_to_rad,
        y = vector3[1] * half_to_rad,
        z = vector3[2] * half_to_rad;
    const sx = Math.sin(x),
        cx = Math.cos(x),
        sy = Math.sin(y),
        cy = Math.cos(y),
        sz = Math.sin(z),
        cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
}