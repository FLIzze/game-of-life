"use client";

import { useState, useEffect } from 'react';

import { NextGeneration } from '@/app/utils/generation';
import { Clear } from '@/app/utils/draw';
import { FooterProps } from '@/app/interfaces';
import Image from 'next/image';

function Footer({ props }: { props: FooterProps }) {
    const { aliveCellsSet, cellSize, setCellSize, ctx, canvasRef, setIsGridTransparent, isGridTransparent } = props;

    const [isPlaying, setIsPlaying] = useState(false);
    const [speedPlayMs, setSpeedPlayMs] = useState(500);

    useEffect(() => {
        if (!isPlaying) return;

        const playInterval = setInterval(() => {
            NextGeneration(aliveCellsSet, cellSize, ctx.current!);
        }, speedPlayMs);

        return () => clearInterval(playInterval);
    }, [isPlaying, aliveCellsSet, cellSize, ctx, speedPlayMs]);

    return (
        <div className='fixed bottom-0 bg-white w-screen text-xl flex gap-x-5 justify-center h-12'>
            <button onClick={() => Clear(canvasRef.current!, ctx.current!, cellSize, aliveCellsSet, isGridTransparent)} >
                <Image 
                    src="/bin.png" 
                    alt="clear"
                    width={20}
                    height={20}
                />
            </button>

            <button onClick={() => setIsPlaying(prev => !prev)}>
                {isPlaying ? (
                    <Image 
                        src="/pause.png" 
                        alt="pause"
                        width={20}
                        height={20}
                    />
                ): (
                    <Image 
                        src="/play.png" 
                        alt="play"
                        width={20}
                        height={20}
                    />
                )}
            </button>

            <div className='flex items-center gap-x-3'>
                <label htmlFor='Speed'>Delay {speedPlayMs} MS</label>
                <input 
                    id='Speed'
                    type='range' 
                    min='100' 
                    max='1000' 
                    value={speedPlayMs} 
                    onChange={(e) =>  setSpeedPlayMs(parseInt(e.target.value))} 
                />
            </div>

            <div className='flex items-center gap-x-3'>
                <label htmlFor='Size'>Size {cellSize}</label>
                <input 
                    id='Size'
                    type='range' 
                    min='5' 
                    max='200' 
                    value={cellSize} 
                    onChange={(e) => setCellSize(parseInt(e.target.value))} 
                />
            </div>

            <div className='flex items-center gap-x-3'>
                <label htmlFor='Transparent'>{isGridTransparent ? 'Show' : 'Hide'}</label>
                <input
                    id='Transparent'
                    type='checkbox'
                    checked={isGridTransparent}
                    onChange={() => setIsGridTransparent(prev => !prev)}
                />
            </div>
        </div>
    )
}

export default Footer;
