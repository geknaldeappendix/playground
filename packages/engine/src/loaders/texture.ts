import { image_create } from "@playground/webgl/image";
import { texture_create } from "@playground/webgl/texture";
import { AssetType } from "../Assets";
import { AssetLoader } from "./AssetLoader";

export class TextureAssetLoader extends AssetLoader<AssetType.Texture> {
    public async load([gl, url]: [WebGL2RenderingContext, string]) {
        const image = await image_create(url);
        return await texture_create(gl, image)
    }
}