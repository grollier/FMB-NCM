import { Variant } from 'motion/react';

export const DRAW_CONFIG: Record<string, Variant> = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (index: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: index * 0.3,
                type: "spring",
                duration: 1.5,
                bounce: 0
            },
            opacity: {
                delay: index * 0.3,
                duration: 0.01
            }
        }
    })
};

export const STROKE_STYLE = {
    strokeWidth: 10,
    strokeLinecap: "round",
    strokeLinejoin: "round"
} as const;