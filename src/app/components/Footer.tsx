"use client";

import { Dispatch, RefObject, useRef, SetStateAction } from 'react';

import { NextGeneration } from '@/app/utils/generation';
import { Clear } from '@/app/utils/draw';
import Button from '@/app/ui/Button';

interface FooterProps {
    aliveCellsSet: Set<string>;
    elementSize: number;
    ctx: CanvasRenderingContext2D;
    canvasRef: RefObject<HTMLCanvasElement>;
    speedPlayMS: number;
    setSpeedPlayMS: Dispatch<SetStateAction<number>>;
}

function Footer({ 
    aliveCellsSet, 
    elementSize, 
    ctx, 
    canvasRef,
    speedPlayMS,
    setSpeedPlayMS
}: FooterProps) {
    console.log(setSpeedPlayMS);
    const isPlaying = useRef(false);

    function handlePlay() {
        if (!isPlaying.current) return;

        NextGeneration(aliveCellsSet, elementSize, ctx);
        setTimeout(() => handlePlay(), speedPlayMS);
    }

    return (
        <div className='fixed bottom-0 bg-white w-screen text-xl flex gap-x-5 justify-center h-12'>
            <Button onClick={() => NextGeneration(aliveCellsSet, elementSize, ctx)} label='next generation' />
            <Button onClick={() => Clear(canvasRef, ctx, elementSize, aliveCellsSet)} label='clear' />
            <Button 
                label={isPlaying ? 'pause' : 'play'} 
                onClick={() => {
                    isPlaying.current = !isPlaying.current;
                    handlePlay();
                }} />
        </div>
    )
}

export default Footer;
