'use client';

import { motion } from 'motion/react';
import { Letter } from './lettersData';
import { DRAW_CONFIG, STROKE_STYLE } from './animationConfig';

interface LettersPathProps {
    d: Letter['d'];
    color: Letter['color'];
    index: number
}

export const LettersPath = ({ d, color, index }: LettersPathProps) => (
    <motion.path
        d={d}
        variants={DRAW_CONFIG}
        custom={index}
        stroke={color}
        fill="transparent"
        style={STROKE_STYLE}
    />
);