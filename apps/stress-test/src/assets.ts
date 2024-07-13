import { AssetType, Assets } from "@playground/engine/Assets";

export enum Shader {
    default = 0
}

export enum Image {
    white1x1 = 0,
}

export enum Texture {
    white1x1 = 0,
    black1x1
}

export type AssetNames = {
    [AssetType.Shader]: Shader,
    [AssetType.Image]: Image,
    [AssetType.Texture]: Texture,
}

export async function assets_load(assets: Assets<AssetNames>, gl: WebGL2RenderingContext) {
    await assets.load(AssetType.Shader, Shader.default, [gl, 'shaders/default.v.glsl', 'shaders/default.f.glsl']),
    await assets.load(AssetType.Texture, Texture.white1x1, [gl, 'images/1x1white.png']),
    await assets.load(AssetType.Texture, Texture.black1x1, [gl, 'images/1x1black.png'])
}