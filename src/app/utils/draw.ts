function DrawPixel(
    i: number, 
    j: number, 
    ctx: CanvasRenderingContext2D,
    aliveCellsSet: Set<string>,
    elementSize: number
) {

    const key = `${i}-${j}`;

    if (aliveCellsSet.has(key)) {
        ctx.fillStyle = 'white';
        aliveCellsSet.delete(key);
    } else {
        ctx.fillStyle = 'black';
        aliveCellsSet.add(key);
    }

    ctx.fillRect(i * elementSize + 1, j * elementSize + 1, elementSize - 2, elementSize - 2);
}

function DrawGrid(
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D,
    elementSize: number,
    aliveCellsSet: Set<string>
) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i <= canvas.width; i += elementSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    for (let j = 0; j <= canvas.height; j += elementSize) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }

    for (const key of aliveCellsSet) {
        const [i, j] = key.split('-').map(Number);
        ctx.fillRect(i * elementSize + 1, j * elementSize + 1, elementSize - 2, elementSize - 2);
    }
}

function DrawCells(
    ctx: CanvasRenderingContext2D,
    elementSize: number,
    aliveCellsSet: Set<string>,
    cellsToDraw: Set<string>
) {
    cellsToDraw.forEach(key => {
        const [i, j] = key.split('-').map(Number);
        if (aliveCellsSet.has(key)) {
            ctx.fillStyle = 'black';  
        } else {
            ctx.fillStyle = 'white'; 
        }
        ctx.fillRect(i * elementSize + 1, j * elementSize + 1, elementSize - 2, elementSize - 2);
    });
}

function DrawSelection(
    selectionCellsSet: React.MutableRefObject<Set<string>>,
    elementSize: number,
    ctx: CanvasRenderingContext2D
) {
    return;
    // selectionCellsSet.forEach(key => {
    //     const [i, j] = key.split(',').map(Number);
    //     ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    //     ctx.fillRect(i * elementSize + 1, j * elementSize + 1, elementSize - 2, elementSize - 2);
    // });
}

export { DrawPixel, DrawGrid, DrawCells, DrawSelection };
