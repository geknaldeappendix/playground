import { AssetLoader, AssetPayloadMap } from "./loaders/AssetLoader";
import { ImageAssetLoader } from "./loaders/image";
import { ShaderAssetLoader } from "./loaders/shader";
import { TextureAssetLoader } from "./loaders/texture";

export type Asset = any;

export enum AssetType {
    Shader = 0,
    Image,
    Texture,
}

export type AssetTypeMap = {
   [AssetType.Shader]: WebGLShader
   [AssetType.Image]: HTMLImageElement
   [AssetType.Texture]: WebGLTexture
}

export type AssetsNames = Record<AssetType, any>

const ERROR_NO_MAP_FOUND = new Error("ERROR_NO_MAP_FOUND");
const ERROR_NO_LOADER_FOUND = new Error("ERROR_NO_LOADER_FOUND");

export class Assets<Names extends AssetsNames> {
    private assets = new Map<AssetType, Map<Names[AssetType], AssetTypeMap[AssetType]>>();
    private loaders = new Map<AssetType, AssetLoader<never>>();

    public constructor() {
        this.loaders.set(AssetType.Shader, new ShaderAssetLoader())
        this.loaders.set(AssetType.Image, new ImageAssetLoader())
        this.loaders.set(AssetType.Texture, new TextureAssetLoader())

        this.assets.set(AssetType.Shader, new Map());
        this.assets.set(AssetType.Image, new Map());
        this.assets.set(AssetType.Texture, new Map());
    }

    private map_by_type<Type extends AssetType>(type: Type): Map<Names[AssetType], AssetTypeMap[AssetType]>{
        const map = this.assets.get(type);
        if (!map) {
            throw ERROR_NO_MAP_FOUND
        }
        return map;
    }

    private loader_by_type<Type extends AssetType>(type: Type): AssetLoader<Type> {
        const loader = this.loaders.get(type);
        if (!loader) {
            throw ERROR_NO_LOADER_FOUND
        }
        return loader
    }

    public get<Type extends AssetType>(
        type: AssetType,
        name: Names[Type]
    ): AssetTypeMap[Type] | undefined {
        const asset = this.map_by_type(type).get(name);
        return asset as AssetTypeMap[Type]
    }

    public async load<Type extends AssetType>(
        type: Type,
        name: Names[Type],
        data: AssetPayloadMap[Type]
    ) {
        const asset = await this.loader_by_type(type).load(data);
        this.map_by_type(type).set(
            name,
            asset
        )
    }
}