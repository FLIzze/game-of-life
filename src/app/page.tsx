"use client";

import { useRef, useMemo, useCallback } from 'react';

import Footer from '@/app/components/Footer';
import Body from '@/app/components/Body';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const aliveCellsSet = useMemo(() => new Set<string>(), []);

    const elementSize = 20;
    const gridWidth = 2560;
    const gridHeight = 1440;

    const getContext = useCallback(() => {
        const canvas = canvasRef.current;
        return canvas?.getContext('2d');
    }, []);

    return (
        <div>
            <Body 
                aliveCellsSet={aliveCellsSet} 
                elementSize={elementSize} 
                ctx={getContext()!} 
                canvasRef={canvasRef}
                gridWidth={gridWidth}
                gridHeight={gridHeight}
            />

            <Footer 
                aliveCellsSet={aliveCellsSet} 
                elementSize={elementSize} 
                ctx={getContext()!} 
                canvasRef={canvasRef}
            />
        </div>
    );
}
