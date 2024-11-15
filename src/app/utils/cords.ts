function GetCords(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    elementSize: number
): [number, number] {

    const mouseX = e.clientX + window.scrollX;
    const mouseY = e.clientY + window.scrollY;

    const i = Math.floor(mouseX / elementSize);
    const j = Math.floor(mouseY / elementSize);

    return [i, j];
}

export { GetCords };
