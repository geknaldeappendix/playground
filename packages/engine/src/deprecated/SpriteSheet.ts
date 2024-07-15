export class SpriteSheet {
    private texcoords: number[][] = []

    public constructor(
        private source_size: [number, number],
        private sprite_size: [number, number],
        { shrink }: { shrink: number } = { shrink: 0 }
    ) {
        const [sw, sh] = source_size;
        const [tw, th] = sprite_size;
        
        for (let y = sh - th; y >= 0; y -= th) {
            for (let x = 0; x < sw; x += tw) {
                const s0 = (x + shrink) / sw;
                const t0 = y / sh;                  // Top of the current sprite
                const s1 = (x + tw - shrink) / sw;
                const t1 = (y + th - shrink) / sh;  // Bottom of the current sprite
                this.texcoords.push([s0, t0, s1, t0, s1, t1, s0, t1]);
            }
        }
    }

    public get(i: number): number[] {
        return this.texcoords[i];
    }
}