import { AssetType, Assets } from "@playground/engine/Assets";

export enum Shader {
    sprite_sheet = 0
}

export enum Image {
    mob_sprite_sheet = 0,
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
    await assets.load(AssetType.Shader, Shader.sprite_sheet, [gl, 'shaders/sprite_sheet.v.glsl', 'shaders/sprite_sheet.f.glsl']),
    await assets.load(AssetType.Image, Image.mob_sprite_sheet, 'images/mob_sprite_sheet.png');
    await assets.load(AssetType.Texture, Texture.mob_sprite_sheet, [gl, 'images/mob_sprite_sheet.png']);
}