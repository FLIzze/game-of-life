import { RefObject } from 'react';

import { NextGeneration, Play } from '@/app/utils/generation';
import { Clear } from '@/app/utils/draw';
import Button from '@/app/ui/Button';

interface FooterProps {
    aliveCellsSet: Set<string>;
    elementSize: number;
    ctx: CanvasRenderingContext2D;
    canvasRef: RefObject<HTMLCanvasElement>;
    speedPlayMS: number;
}

function Footer({ 
    aliveCellsSet, 
    elementSize, 
    ctx, 
    canvasRef,
    speedPlayMS
}: FooterProps) {
    return (
        <div className='fixed bottom-0 bg-white w-screen text-xl flex gap-x-5 justify-center h-12'>
            <Button 
                onClick={() => NextGeneration(aliveCellsSet, elementSize, ctx)}
                label='next generation'
            />

            <Button 
                onClick={() => Clear(canvasRef, ctx, elementSize, aliveCellsSet)}
                label='clear'
            />
            
            <Button
                label='play'
                onClick={() => Play(speedPlayMS, aliveCellsSet, elementSize, ctx)}
            />
        </div>
    )
}

export default Footer;
