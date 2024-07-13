import { program_create } from "@playground/webgl/program";
import { AssetType } from "../Assets";
import { AssetLoader } from "./AssetLoader";

export class ShaderAssetLoader extends AssetLoader<AssetType.Shader> {
    public async load(args: [WebGL2RenderingContext, string, string]) {
        return await program_create(...args)
    }
}