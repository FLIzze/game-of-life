import { DrawCells } from '@/app/utils/draw';

function GetNeighbors(
    i: number, 
    j: number,
    aliveCellsSet: Set<string>
): number {

    const neighborOffsets = [
        [-1, -1], [0, -1], [1, -1], 
        [-1, 0],           [1, 0], 
        [-1, 1], [0, 1], [1, 1]
    ];

    let count = 0;
    for (const [dx, dy] of neighborOffsets) {
        const neighborKey = `${i + dx}-${j + dy}`;
        if (aliveCellsSet.has(neighborKey)) count++;
    }
    return count;
}

function NextGeneration(
    aliveCellsSet: Set<string>,
    elementSize: number,
    ctx: CanvasRenderingContext2D,
) {

    const tempAliveCellsSet = new Set<string>();
    const cellsToDraw = new Set<string>();

    for (const key of aliveCellsSet) {
        const [i, j] = key.split('-').map(Number);
        const neighbors = GetNeighbors(i, j, aliveCellsSet);

        if (neighbors === 3 || neighbors === 2) {
            tempAliveCellsSet.add(key);  
        } else {
            cellsToDraw.add(key);
        }
    }

    for (const key of aliveCellsSet) {
        const [i, j] = key.split('-').map(Number);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; 
                const ni = i + dx;
                const nj = j + dy;
                const neighborKey = `${ni}-${nj}`;

                if (!aliveCellsSet.has(neighborKey) && GetNeighbors(ni, nj, aliveCellsSet) === 3) {
                    tempAliveCellsSet.add(neighborKey);  
                    cellsToDraw.add(neighborKey);
                }
            }
        }
    }

    aliveCellsSet.clear(); 
    tempAliveCellsSet.forEach(cell => aliveCellsSet.add(cell)); 

    DrawCells(ctx, elementSize, aliveCellsSet, cellsToDraw);
}

export { NextGeneration };
