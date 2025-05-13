"use client";

import { Stack, Image as ChakraImage, For } from "@chakra-ui/react";
import { motion } from "motion/react";
import Image from "next/image";

const technologies = [
	{
		name: "FastApi",
		image: "/assets/images/fastapi.svg",
		alt: "fastapi-logo",
		width: 512,
		height: 512,
	},
	{
		name: "MongoDB",
		image: "/assets/images/mongodb.svg",
		alt: "mongodb-logo",
		width: 512,
		height: 512,
	},
	{
		name: "Beanie",
		image: "/assets/images/beanie.svg",
		alt: "beanie-logo",
		width: 512,
		height: 512,
	},
	{
		name: "NextJs",
		image: "/assets/images/nextjs.svg",
		alt: "nextjs-logo",
		width: 512,
		height: 512,
	},
	{
		name: "Chakra-UI",
		image: "/assets/images/chakra.svg",
		alt: "chakra-ui-logo",
		width: 512,
		height: 512,
	},
	{
		name: "Motion",
		image: "/assets/images/motion.svg",
		alt: "motion-logo",
		width: 512,
		height: 512,
	},
];

export const TechStack = () => {
	return (
		<Stack direction="row" gap={8} justify="center" align="center" w="100%">
			<For each={technologies}>
				{(tech, index) => (
					<motion.div
						key={tech.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: index * 0.2,
							duration: 0.5,
							ease: "easeOut",
						}}
						whileHover={{ scale: 1.1 }}
					>
						<ChakraImage
							asChild
							cursor="pointer"
							transition="transform 0.2s var(--chakra-tokens-easings-ease-in-out)"
							_hover={{
								transform: "scale(1.1)",
							}}
						>
							<Image
								src={tech.image}
								alt={tech.alt}
								width={tech.width}
								height={tech.height}
								style={{
									objectFit: "contain",
									width: "100%",
									height: "auto",
								}}
								priority
							></Image>
						</ChakraImage>
					</motion.div>
				)}
			</For>
		</Stack>
	);
};
