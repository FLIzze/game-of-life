"use client";

import { useRef, useState, useEffect } from 'react';

import { handleMouseMove, handleOnClick, handleKey } from '@/app/utils/input';
import { DrawGrid } from '@/app/utils/draw';
import { BodyProps } from '@/app/interfaces';

function Body({ props }: { props: BodyProps }) {
    const { ctx, cellSize, aliveCellsSet, canvasRef, gridWidth, gridHeight, isGridTransparent, isLoading } = props;

    const lastCords = useRef<[number, number]>() as React.MutableRefObject<[number, number]>;
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        if (!ctx.current || !canvasRef.current) return;

        DrawGrid(canvasRef.current, ctx.current, cellSize, aliveCellsSet, isGridTransparent);
    }, [aliveCellsSet, cellSize, ctx, canvasRef, isGridTransparent, isLoading]);

    useEffect(() => {
        handleKey(setIsShiftPressed);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            height={gridHeight}
            width={gridWidth}
            onClick={(e) => handleOnClick(e, lastCords, isShiftPressed, cellSize, aliveCellsSet, ctx.current!)}

            onMouseDown={(e) => {
                e.preventDefault();
                setIsMouseDown(true);
            }}

            onMouseUp={(e) => {
                e.preventDefault();
                setIsMouseDown(false);
            }} 

            onMouseMove={(e) => handleMouseMove(e, lastCords, isMouseDown, isShiftPressed, cellSize, aliveCellsSet, ctx.current!)}
        />
    )
}

export default Body;
