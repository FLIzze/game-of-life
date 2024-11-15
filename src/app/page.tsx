"use client";

import { useRef, useEffect, useMemo, useCallback, useState } from 'react';

import { DrawGrid } from '@/app/utils/draw';
import { nextGeneration } from '@/app/utils/generation';
import { handleMouseMove, handleOnClick, handleKey } from '@/app/utils/input';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastCords = useRef<[number, number]>() as React.MutableRefObject<[number, number]>;

    const aliveCellsSet = useMemo(() => new Set<string>(), []);

    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const elementSize = 30;
    const gridWidth = 2560;
    const gridHeight = 1440;

    const getContext = useCallback(() => {
        const canvas = canvasRef.current;
        return canvas?.getContext('2d');
    }, []);

    useEffect(() => {
        const ctx = getContext();
        if (!ctx) return;

        DrawGrid(canvasRef.current!, ctx, elementSize, aliveCellsSet);
    }, [aliveCellsSet, elementSize, getContext]); 

    useEffect(() => {
        handleKey(setIsShiftPressed);
    }, []);

    return (
        <div>
            <canvas 
                ref={canvasRef} 
                height={gridHeight}
                width={gridWidth}
                onClick={(e) => handleOnClick(e, lastCords, isShiftPressed, elementSize, aliveCellsSet, getContext()!)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIsMouseDown(true);
                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    setIsMouseDown(false);
                }} 
                onMouseMove={(e) => handleMouseMove(e, lastCords, isMouseDown, isShiftPressed, elementSize, aliveCellsSet, getContext()!)}
            />

            <div className='fixed bottom-0 bg-white w-screen text-xl flex gap-x-5'>
                <button 
                    type="button"
                    onClick={() => nextGeneration(aliveCellsSet, elementSize, getContext()!)}
                > next generation </button>   

                <button 
                    type="button"
                    onClick={() => {
                        aliveCellsSet.clear();
                        DrawGrid(canvasRef.current!, getContext()!, elementSize, aliveCellsSet);
                    }}
                > clear </button>   
            </div>
        </div>
    );
}
