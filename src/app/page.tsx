"use client";

import { useRef, useEffect, useState } from 'react';

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const elementSize = 30;
    const gridWidth = 1920;
    const gridHeight = 1080;

    const cols = Math.floor(gridHeight / elementSize);
    const rows = Math.floor(gridWidth / elementSize);

    const [grid, setGrid] = useState(new Array(cols * rows).fill(0));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i <= canvas.width; i += elementSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        for (let j = 0; j <= canvas.height; j += elementSize) {
            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(canvas.width, j);
            ctx.stroke();
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const cell = grid[i * rows + j];
                ctx.fillStyle = cell === 0 ? 'white' : 'black';
                ctx.fillRect(j * elementSize + 1, i * elementSize + 1, elementSize - 2, elementSize - 2);
            }
        }
    }, [cols, rows, grid]); 

    function getCords(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const mouseX = e.clientX + window.scrollX;
        const mouseY = e.clientY + window.scrollY;

        const i = Math.floor(mouseX / elementSize);
        const j = Math.floor(mouseY / elementSize);

        addPixel(i, j);
    }

    function addPixel(i: number, j: number) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(i * elementSize + 1, j * elementSize + 1, 1, 1);
        const data = imageData.data;

        if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 255) {
            ctx.fillStyle = 'white';
        } else {
            ctx.fillStyle = 'black';
        }

        ctx.fillRect(i * elementSize + 1, j * elementSize + 1, elementSize - 2, elementSize - 2);
    }

    return (
        <canvas 
            ref={canvasRef} 
            height={gridHeight}
            width={gridWidth}
            onClick={(e) => getCords(e)}
        />
    );
}
