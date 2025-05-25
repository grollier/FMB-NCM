"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Center, Box } from "@chakra-ui/react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { AnimatedLetters } from "./animated-letters";
import { TechStack } from "./techstack";

export const AnimtationWrapper = () => {
	const [animationPhase, setAnimationPhase] = useState(0);

	useEffect(() => {
		if (animationPhase === 0) {
			const timeout = setTimeout(() => setAnimationPhase(1), 4800);
			return () => clearTimeout(timeout);
		}
	}, [animationPhase]);

	return (
		<Center
			position="absolute"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			w="100%"
		>
			<Box w="100%" h="100%">
				<AnimatePresence mode="wait">
					{animationPhase === 0 && (
						<motion.div
							key="letters"
							initial={{ y: 0 }}
							exit={{
								opacity: 0,
								y: -50,
								transition: {
									ease: "easeInOut",
								},
							}}
						>
							<AnimatedLetters />
						</motion.div>
					)}

					{animationPhase === 1 && (
						<motion.div
							key="tech-stack"
							initial={{ opacity: 0, y: 50 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: "spring",
									stiffness: 100,
								},
							}}
							exit={{
								opacity: 0,
								y: -50,
								transition: {
									ease: "easeInOut",
								},
							}}
						>
							<TechStack />
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Center>
	);
};
