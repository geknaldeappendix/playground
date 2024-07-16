import { Vector3, vector3_create } from "@playground/math/vector3";

export type Camera = {
    position: Vector3
    // target: Vector3
    // projection: Matrix4x4
    // view: Matrix4x4
    // fovy: number
    // zoom: number
    canvas: HTMLCanvasElement
}

export function
camera_create(canvas: HTMLCanvasElement): Camera {
    return {
        position: vector3_create(0, 0, 0),
        canvas
    };
}

// export function
// camera_tick(
//     camera: Camera,
// ) {
//     const aspect = camera.canvas.width / camera.canvas.height;

//     matrix4x4_perspective(camera.projection, camera.fovy, aspect, 0.1, 100);
//     matrix4x4_look_at(camera.view, camera.position, camera.target, VECTOR3_UP);
// }

// export function 
// camera_tick_ortho(
//     camera: Camera,
// ) {
//     const width = camera.canvas.width;
//     const height = camera.canvas.height;

//     matrix_orthographic(camera.projection, -width, width, height, -height, 0.1, 100);
//     matrix4x4_look_at(camera.view, camera.position, camera.target, VECTOR3_UP);
// }