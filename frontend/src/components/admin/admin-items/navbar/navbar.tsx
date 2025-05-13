"use client";

import { useState } from "react";
import { Flex, Heading, Box, IconButton } from "@chakra-ui/react";
import { motion } from "motion/react";
import { LuSquareMenu } from "react-icons/lu";
import { DashboardDrawer } from "@/components/admin/admin-items/drawer/drawer";

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
			<DashboardDrawer open={open} onToggle={setOpen} />

			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<IconButton
					aria-label="Open menu"
					variant="ghost"
					color="white"
					_hover={{ bg: "rgba(255, 255, 255, 0.1" }}
					onClick={() => setOpen(!open)}
				>
					<LuSquareMenu />
				</IconButton>
			</motion.div>

			<Heading
				size="lg"
				fontWeight="semibold"
				colorPalette="whiteAlpha"
				letterSpacing="tight"
				p={2}
				flex={1}
				textAlign="center"
			>
				Welcome to the Dashboard
			</Heading>

			<Box flex={1} display="flex" justifyContent="end" />
		</Flex>
	);
}
