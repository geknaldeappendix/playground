export async function 
image_create(
    source_url: string
): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = source_url;
    });
}
