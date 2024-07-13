import { Quaternion } from "./quaternion";
import { Vector3 } from "./vector3";

export type Matrix4x4 = Float32Array;

export function 
matrix4x4_create(): Matrix4x4 {
    const matrix4x4 = new Float32Array(16);
    matrix4x4[0] = 1;
    matrix4x4[5] = 1;
    matrix4x4[10] = 1;
    matrix4x4[15] = 1;
    return matrix4x4;
}

export function
matrix_from_translation_rotation_scale(
    out: Matrix4x4,
    translation: Vector3,
    [rx, ry, rz, rw]: Quaternion,
    [sx, sy, sz]: Vector3
) {
    const x2 = rx + rx,
        y2 = ry + ry,
        z2 = rz + rz;
    const xx = rx * x2,
        xy = rx * y2,
        xz = rx * z2,
        yy = ry * y2,
        yz = ry * z2,
        zz = rz * z2,
        wx = rw * x2,
        wy = rw * y2,
        wz = rw * z2;
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = translation[0];
    out[13] = translation[1];
    out[14] = translation[2];
    out[15] = 1;
}

export function 
matrix4x4_perspective(
    out: Matrix4x4,
    fovy: number,
    aspect: number,
    near: number,
    far: number
): Matrix4x4 {
    const f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);

    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
}

export function 
matrix4x4_look_at(
    out: Matrix4x4,
    eye: Vector3,
    center: Vector3,
    up: Vector3
) {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    const eyex = eye[0];
    const eyey = eye[1];
    const eyez = eye[2];
    const upx = up[0];
    const upy = up[1];
    const upz = up[2];
    const centerx = center[0];
    const centery = center[1];
    const centerz = center[2];
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
}
