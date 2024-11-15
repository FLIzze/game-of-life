"use client";

import { useRef, useEffect, useMemo, useCallback } from 'react';

import { DrawGrid, DrawPixel } from '@/app/utils/draw';
import { GetCords } from '@/app/utils/cords';
import { nextGeneration } from '@/app/utils/generation';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const aliveCellsSet = useMemo(() => new Set<string>(), []);

    const elementSize = 30;
    const gridWidth = 1920;
    const gridHeight = 1080;

    const getContext = useCallback(() => {
        const canvas = canvasRef.current;
        return canvas?.getContext('2d');
    }, []);

    useEffect(() => {
        const ctx = getContext();
        if (!ctx) return;

        DrawGrid(canvasRef.current!, ctx, elementSize, aliveCellsSet);
    }, [aliveCellsSet, elementSize, getContext]); 

    return (
        <div>
            <canvas 
                ref={canvasRef} 
                height={gridHeight}
                width={gridWidth}
                onClick={(e) => {
                    const [i, j] = GetCords(e, elementSize);
                    DrawPixel(i, j, getContext()!, aliveCellsSet, elementSize);
                }}
            />
            <button 
                type="button"
                onClick={() => nextGeneration(aliveCellsSet, canvasRef, elementSize, getContext()!)}
            > next generation </button>   
        </div>
    );
}

