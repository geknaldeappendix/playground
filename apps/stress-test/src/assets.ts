import { AssetType, Assets } from "@playground/engine/Assets";

export enum Shader {
    mob_renderer = 0
}

export enum Image {
}

export enum Texture {
    mob_sprite_sheet = 0,
}

export type AssetNames = {
    [AssetType.Shader]: Shader,
    [AssetType.Image]: Image,
    [AssetType.Texture]: Texture,
}

export async function assets_load(assets: Assets<AssetNames>, gl: WebGL2RenderingContext) {
    await assets.load(AssetType.Shader, Shader.mob_renderer, [gl, 'shaders/mob_renderer.v.glsl', 'shaders/mob_renderer.f.glsl']),
    await assets.load(AssetType.Texture, Texture.mob_sprite_sheet, [gl, 'images/mob_sprite_sheet.png']);
}