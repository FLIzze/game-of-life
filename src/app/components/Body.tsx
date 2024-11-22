"use client";

import { useRef, useState, useEffect, RefObject } from 'react';

import { handleMouseMove, handleOnClick, handleKey } from '@/app/utils/input';
import { DrawGrid } from '@/app/utils/draw';

interface BodyProps {
    ctx: CanvasRenderingContext2D;
    elementSize: number;
    aliveCellsSet: Set<string>;
    canvasRef: RefObject<HTMLCanvasElement>;
    gridWidth: number;
    gridHeight: number;
}

function Body({ 
    ctx, 
    elementSize, 
    aliveCellsSet, 
    canvasRef,
    gridWidth,
    gridHeight
}: BodyProps) {
    const lastCords = useRef<[number, number]>() as React.MutableRefObject<[number, number]>;

    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        if (!ctx) return;

        DrawGrid(canvasRef.current!, ctx, elementSize, aliveCellsSet);
    }, [aliveCellsSet, elementSize, ctx, canvasRef]);

    useEffect(() => {
        handleKey(setIsShiftPressed);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            height={gridHeight}
            width={gridWidth}
            onClick={(e) => handleOnClick(e, lastCords, isShiftPressed, elementSize, aliveCellsSet, ctx)}

            onMouseDown={(e) => {
                e.preventDefault();
                setIsMouseDown(true);
            }}

            onMouseUp={(e) => {
                e.preventDefault();
                setIsMouseDown(false);
            }} 

            onMouseMove={(e) => handleMouseMove(e, lastCords, isMouseDown, isShiftPressed, elementSize, aliveCellsSet, ctx)}
        />
    )
}

export default Body;
