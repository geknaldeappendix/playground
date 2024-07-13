import { image_create } from "@playground/webgl/image";
import { AssetType } from "../Assets";
import { AssetLoader } from "./AssetLoader";

export class ImageAssetLoader extends AssetLoader<AssetType.Image> {
    public async load(args: string) {
        return await image_create(args)
    }
}