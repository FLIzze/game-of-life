"use client";

import { useRef, useMemo, useState, useEffect } from 'react';

import Footer from '@/app/components/Footer';
import Body from '@/app/components/Body';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = useRef<CanvasRenderingContext2D | null>(null);

    const aliveCellsSet = useMemo(() => new Set<string>(), []);

    const [isLoading, setIsLoading] = useState(true);
    const [cellSize, setCellSize] = useState(20);
    const [isGridTransparent, setIsGridTransparent] = useState(false);
    const gridWidth = 2560;
    const gridHeight = 1440;

    useEffect(() => {
        if (canvasRef.current) {
            ctx.current = canvasRef.current.getContext('2d');
        }

        setIsLoading(false);
    }, []);

    const BodyProps = {aliveCellsSet, cellSize, ctx, canvasRef, gridWidth, gridHeight, isGridTransparent, isLoading};
    const FooterProps = {aliveCellsSet, cellSize, setCellSize, ctx, canvasRef, isGridTransparent, setIsGridTransparent};

    return (
        <>
            <Body props={BodyProps}/>
            <Footer props={FooterProps} />
        </>
    );
}
