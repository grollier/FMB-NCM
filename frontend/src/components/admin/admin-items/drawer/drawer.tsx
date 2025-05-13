"use client";

import { useState, useRef, useEffect } from "react";
import { Drawer, Portal } from "@chakra-ui/react";
import { motion } from "motion/react";
import { useDimensions } from "./use-dimensions";
import { sidebarVariants } from "./motion-variants";
import { DrawerContent } from "./drawer-content";
import { MenuToggle } from "@/components/items/menu-toggle";

export const DashboardDrawer = ({
	open,
	onToggle,
}: {
	open: boolean;
	onToggle: (state: boolean) => void;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { height } = useDimensions(containerRef);

	return (
		<Drawer.Root
			open={open}
			placement="end"
			onOpenChange={() => onToggle(false)}
			size="md"
		>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<motion.div
						initial={false}
						animate={open ? "open" : "closed"}
						custom={height}
						ref={containerRef}
						variants={sidebarVariants}
						style={{
							width: "100%",
							height: "100%",
							position: "relative",
						}}
					>
						<Drawer.Content
							height="100%"
							maxWidth="300px"
							position="relative"
							bg="bg"
							boxShadow="xl"
						>
							<Drawer.Body p={0}>
								<DrawerContent isOpen={open} />
								<MenuToggle isOpen={open} toggle={() => onToggle(!open)} />
							</Drawer.Body>
						</Drawer.Content>
					</motion.div>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
