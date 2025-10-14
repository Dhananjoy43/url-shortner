"use client";

import { useEffect, useId, useState } from "react";

export const GridPatternBackground = ({
    pattern,
    size = 20,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const [clientPattern, setClientPattern] = useState<number[][] | null>(null);

    useEffect(() => {
        if (!pattern) {
            const generated = Array.from({ length: 5 }, () => [
                Math.floor(Math.random() * 4) + 7,
                Math.floor(Math.random() * 6) + 1,
            ]);
            setClientPattern(generated);
        }
    }, [pattern]);

    const p = pattern ?? clientPattern;

    if (!p) return null; // Wait for client pattern

    return (
        <div className="pointer-events-none absolute inset-0 -mt-1 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100 dark:from-zinc-900/30 dark:to-zinc-900/30">
                <GridPattern
                    width={size}
                    height={size}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares.map(([x, y]: any, index: number) => (
                <rect
                    strokeWidth="0"
                    key={`${x}-${y}-${index}`} // Unique key
                    width={width + 1}
                    height={height + 1}
                    x={x * width}
                    y={y * height}
                />
            ))}
        </svg>
    );
}
