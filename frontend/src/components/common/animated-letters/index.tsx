'use client';

import { motion } from "motion/react";
import { Box, For } from "@chakra-ui/react";
import { LETTERS_DATA } from "./lettersData";
import { LettersPath } from "./lettersPath";

export const AnimatedLetters = () => (
    <Box position="relative" width="100%" h="100%">
        <motion.svg
            viewBox="0 0 1920 1000"
            initial="hidden"
            animate="visible"
            style={{
                width: "100%",
                height: 'auto',
                overflow: 'visible'
            }}
        >
            <For each={LETTERS_DATA}>
                {(letter, index) => (
                    <LettersPath
                        key={letter.id}
                        index={index}
                        d={letter.d}
                        color={letter.color}
                    />
                )}
            </For>
        </motion.svg>
    </Box>
);