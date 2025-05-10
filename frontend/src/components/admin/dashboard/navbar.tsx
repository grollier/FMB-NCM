"use client";

import { useState } from "react";
import { Flex, Heading, Box, IconButton } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuSquareMenu } from "react-icons/lu";

export default function DashboardNavbar() {
	const [open, setOpen] = useState(false);

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			px={{ base: 4, md: 8 }}
			py={4}
			bg="internationalOrange.solid"
			boxShadow="lg"
			position="sticky"
			top={0}
			zIndex="sticky"
			color="white"
		>
			<IconButton
				aria-label="Open Menu"
				variant="ghost"
				colorPalette="vanDyke.500"
				size="lg"
				onClick={() => setOpen(true)}
			>
				<LuSquareMenu />
			</IconButton>

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Heading
					size="lg"
					fontWeight="semibold"
					colorPalette="whiteAlpha"
					letterSpacing="tight"
				>
					Welcome to the Dashboard
				</Heading>
			</motion.div>

			<Box flex={1} display="flex" justifyContent="end" />
		</Flex>
	);
}