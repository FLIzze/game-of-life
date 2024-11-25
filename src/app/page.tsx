"use client";

import { useRef, useMemo, useState } from 'react';

import Footer from '@/app/components/Footer';
import Body from '@/app/components/Body';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;

    const aliveCellsSet = useMemo(() => new Set<string>(), []);

    const [speedPlayMS, setSpeedPlayMS] = useState(1000);
    const [elementSize] = useState(20);
    const gridWidth = 2560;
    const gridHeight = 1440;

    return (
        <div>
            <Body 
                aliveCellsSet={aliveCellsSet} 
                elementSize={elementSize} 
                ctx={ctx} 
                canvasRef={canvasRef}
                gridWidth={gridWidth}
                gridHeight={gridHeight}
            />

            <Footer 
                aliveCellsSet={aliveCellsSet} 
                elementSize={elementSize} 
                ctx={ctx} 
                canvasRef={canvasRef}
                speedPlayMS={speedPlayMS}
                setSpeedPlayMS={setSpeedPlayMS}
            />
        </div>
    );
}
