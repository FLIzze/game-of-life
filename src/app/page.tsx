"use client";

import { useRef, useEffect, useMemo, useCallback, useState } from 'react';

import { DrawGrid, DrawPixel } from '@/app/utils/draw';
import { GetCords } from '@/app/utils/cords';
import { nextGeneration } from '@/app/utils/generation';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastCords = useRef<[number, number]>();

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
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Shift') setIsShiftPressed(true);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Shift') setIsShiftPressed(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!isMouseDown || !isShiftPressed) return;

        const [i, j] = GetCords(e, elementSize);
        if (lastCords.current && lastCords.current[0] === i && lastCords.current[1] === j) return;
        lastCords.current = [i, j];
        DrawPixel(i, j, getContext()!, aliveCellsSet, elementSize);
    }

    function handleOnClick(e: React.MouseEvent<HTMLCanvasElement>) {
        if (isShiftPressed) return;

        const [i, j] = GetCords(e, elementSize);
        lastCords.current = [i, j];
        DrawPixel(i, j, getContext()!, aliveCellsSet, elementSize);
    }

    return (
        <div>
            <canvas 
                ref={canvasRef} 
                height={gridHeight}
                width={gridWidth}
                onClick={handleOnClick}
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIsMouseDown(true);
                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    setIsMouseDown(false);
                }} 
                onMouseMove={handleMouseMove}
            />
            <button 
                type="button"
                onClick={() => nextGeneration(aliveCellsSet, elementSize, getContext()!)}
            > next generation </button>   
        </div>
    );
}
