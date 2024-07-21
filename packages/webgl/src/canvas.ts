function 
_on_resize(canvas: HTMLCanvasElement) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.width = document.body.clientWidth + 'px';
    canvas.style.height = document.body.clientHeight + 'px';
} 

export function 
canvas_create_fullscreen(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    window.onresize = () => _on_resize(canvas);
    _on_resize(canvas);
    document.body.appendChild(canvas);
    return canvas;
}

console.log("creating canvas")
export const canvas = canvas_create_fullscreen();