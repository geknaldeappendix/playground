export type Vector2 = Float32Array;

export function vector2_create(
    x = 0,
    y = 0,
): Vector2 {
    const vector = new Float32Array(2);
    vector[0] = x;
    vector[1] = y;
    return vector;
}

export function vector2_clone(
    from: Vector2
): Vector2 {
    const vector = new Float32Array(2);
    vector[0] = from[0];
    vector[1] = from[1];
    return vector;
}

export function vector2_add(
    out: Vector2,
    a: Vector2,
    b: Vector2
): Vector2 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

export function vector2_subtract(
    out: Vector2,
    a: Vector2,
    b: Vector2
): Vector2 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

export function vector2_multiply(
    out: Vector2,
    a: Vector2,
    b: Vector2
): Vector2 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}

export function vector2_divide(
    out: Vector2,
    a: Vector2,
    b: Vector2
): Vector2 {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}

export function vector2_scale(
    out: Vector2,
    vector: Vector2,
    value: number
): Vector2 {
    out[0] = vector[0] * value;
    out[1] = vector[1] * value; 
    return out;
}

export function vector2_magnitude(
    vector: Vector2
): number {
    return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
}

export function vector2_normalize(
    out: Vector2,
    vector: Vector2,
): Vector2 {
    const magnitude = vector2_magnitude(vector);
    out[0] = vector[0] / magnitude;
    out[1] = vector[1] / magnitude;
    return out;
}

