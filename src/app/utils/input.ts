import { GetCords } from '@/app/utils/cords';
import { DrawPixel } from '@/app/utils/draw';

function handleMouseMove(
    e: React.MouseEvent<HTMLCanvasElement>,
    lastCords: React.MutableRefObject<[number, number]>,
    isMouseDown: boolean,
    isShiftPressed: boolean,
    isCtrlPressed: boolean,
    elementSize: number,
    aliveCellsSet: Set<string>,
    ctx: CanvasRenderingContext2D,
    selectionCellsSet: Set<string>,
) {

    if (!isMouseDown) return;

    const [i, j] = GetCords(e, elementSize);
    if (lastCords.current && lastCords.current[0] === i && lastCords.current[1] === j) return;
    lastCords.current = [i, j];

    if (isShiftPressed) {
        DrawPixel(i, j, ctx, aliveCellsSet, elementSize);
    } else if (isCtrlPressed) {
        selectionCellsSet.add(`${i},${j}`);
    }
}

function handleOnClick(
    e: React.MouseEvent<HTMLCanvasElement>,
    lastCords: React.MutableRefObject<[number, number]>,
    isShiftPressed: boolean,
    elementSize: number,
    aliveCellsSet: Set<string>,
    ctx: CanvasRenderingContext2D
) {

    if (isShiftPressed) return;

    const [i, j] = GetCords(e, elementSize);
    lastCords.current = [i, j];
    DrawPixel(i, j, ctx, aliveCellsSet, elementSize);
}

function handleKey(
    setIsShiftPressed: React.Dispatch<React.SetStateAction<boolean>>,
    setIsCtrlPressed: React.Dispatch<React.SetStateAction<boolean>>
) {

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(true)
        } else if (e.key === 'Control') {
            setIsCtrlPressed(true);
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftPressed(false);
        } else if (e.key === 'Control') {
            setIsCtrlPressed(false);
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
