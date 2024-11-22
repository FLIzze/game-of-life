import { GetCords } from '@/app/utils/cords';
import { DrawCell } from '@/app/utils/draw';

import { MutableRefObject, Dispatch, SetStateAction, MouseEvent } from 'react';

function handleMouseMove(
    e: MouseEvent<HTMLCanvasElement>,
    lastCords: MutableRefObject<[number, number]>,
    isMouseDown: boolean,
    isShiftPressed: boolean,
    elementSize: number,
    aliveCellsSet: Set<string>,
    ctx: CanvasRenderingContext2D
) {
    if (!isMouseDown) return;
    if (!ctx) return;

    const [i, j] = GetCords(e, elementSize);
    if (lastCords.current && lastCords.current[0] === i && lastCords.current[1] === j) return;
    lastCords.current = [i, j];

    if (isShiftPressed) {
        DrawCell(i, j, ctx, aliveCellsSet, elementSize);
    }
}

function handleOnClick(
    e: MouseEvent<HTMLCanvasElement>,
    lastCords: MutableRefObject<[number, number]>,
    isShiftPressed: boolean,
    elementSize: number,
    aliveCellsSet: Set<string>,
    ctx: CanvasRenderingContext2D
) {
    if (isShiftPressed) return;

    const [i, j] = GetCords(e, elementSize);
    lastCords.current = [i, j];
    DrawCell(i, j, ctx, aliveCellsSet, elementSize);
}

function handleKey(
    setIsShiftPressed: Dispatch<SetStateAction<boolean>>
) {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(true)
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(false);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
}

export { handleMouseMove, handleOnClick, handleKey };
