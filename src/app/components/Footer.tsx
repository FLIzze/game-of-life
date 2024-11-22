import { NextGeneration } from '@/app/utils/generation';
import { Clear } from '@/app/utils/draw';

import { RefObject } from 'react';

interface FooterProps {
    aliveCellsSet: Set<string>;
    elementSize: number;
    ctx: CanvasRenderingContext2D;
    canvasRef: RefObject<HTMLCanvasElement>;
}

function Footer({ 
    aliveCellsSet, 
    elementSize, 
    ctx, 
    canvasRef 
}: FooterProps) {
    return (
        <div className='fixed bottom-0 bg-white w-screen text-xl flex gap-x-5 justify-center h-12'>
            <button 
                type="button"
                onClick={() => NextGeneration(aliveCellsSet, elementSize, ctx)}
            > next generation </button>   

            <button 
                type="button"
                onClick={() => Clear(canvasRef, ctx, elementSize, aliveCellsSet)}
            > clear </button>   
        </div>
    )
}

export default Footer;
