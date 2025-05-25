import type { Variants } from "motion/react";

export const sidebarVariants: Variants = {
	open: (height = 1000) => ({
		clipPath: "xywh(1 5px 100% 75% round 0 0)",
		transition: {
			type: "stpring",
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: "xywh(0 5px 100% 75% round 15% 0)",
		transition: {
			delay: 0.2,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

export const navVariants: Variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

export const itemVariants: Variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: { y: { stiffness: 1000, velocity: -100 } },
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: { y: { stiffness: 1000 } },
	},
};

export const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
