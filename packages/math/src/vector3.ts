export type Vector3 = Float32Array;

export function vector3_create(
    x = 0,
    y = 0,
    z = 0,
): Vector3 {
    const vector = new Float32Array(3);
    vector[0] = x;
    vector[1] = y;
    vector[2] = z;
    return vector;
}

export const VECTOR3_UP = vector3_create(0, 1, 0);

export function vector3_clone(
    from: Vector3
): Vector3 {
    const vector = new Float32Array(3);
    vector[0] = from[0];
    vector[1] = from[1];
    vector[2] = from[2];
    return vector;
}

export function vector3_add(
    out: Vector3,
    a: Vector3,
    b: Vector3
): Vector3 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
}

export function vector3_subtract(
    out: Vector3,
    a: Vector3,
    b: Vector3
): Vector3 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}

export function vector3_multiply(
    out: Vector3,
    a: Vector3,
    b: Vector3
): Vector3 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
}

export function vector3_divide(
    out: Vector3,
    a: Vector3,
    b: Vector3
): Vector3 {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
}

export function vector3_scale(
    out: Vector3,
    vector: Vector3,
    value: number
): Vector3 {
    out[0] = vector[0] * value;
    out[1] = vector[1] * value; 
    out[2] = vector[2] * value;
    return out;
}

