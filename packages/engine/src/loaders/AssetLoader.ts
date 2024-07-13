import { Asset, AssetType } from "../Assets";

export type AssetPayloadMap = {
    [AssetType.Shader]: [WebGL2RenderingContext, string, string]
    [AssetType.Image]: string
    [AssetType.Texture]: [WebGL2RenderingContext, string]
}

export abstract class AssetLoader<Type extends AssetType> {
    public abstract load(args: AssetPayloadMap[Type]): Promise<Asset>;
}
