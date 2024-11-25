import { Dispatch, RefObject, MutableRefObject, SetStateAction } from "react";

interface FooterProps {
    aliveCellsSet: Set<string>;
    cellSize: number;
    setCellSize: Dispatch<SetStateAction<number>>;
    ctx: MutableRefObject<CanvasRenderingContext2D | null>;
    canvasRef: RefObject<HTMLCanvasElement>;
    isGridTransparent: boolean;
    setIsGridTransparent: Dispatch<SetStateAction<boolean>>;
}

interface BodyProps {
    ctx: MutableRefObject<CanvasRenderingContext2D | null>;
    cellSize: number;
    aliveCellsSet: Set<string>;
    canvasRef: RefObject<HTMLCanvasElement>;
    gridWidth: number;
    gridHeight: number;
    isGridTransparent: boolean;
    isLoading: boolean;
}

export type { FooterProps, BodyProps };
