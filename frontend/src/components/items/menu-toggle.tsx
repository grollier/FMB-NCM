import { motion } from "motion/react";
import React from "react";

const Path = (props: React.ComponentProps<typeof motion.path>) => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="hsl(0, 0%, 18%)"
		strokeLinecap="round"
		{...props}
	/>
);

const pathVariants = {
	closed: { d: "M 2 2.5 L 20 2.5" },
	open: { d: "M 3 16.5 L 17 2.5" },
};

const middlePathVariants = {
	closed: { opacity: 1 },
	open: { opacity: 0 },
};

// frontend/src/components/items/menu-toggle.tsx
export const MenuToggle = ({
	isOpen,
	toggle,
	...props
}: {
	isOpen: boolean;
	toggle: () => void;
} & React.ComponentProps<typeof motion.button>) => (
	<motion.button
		{...props}
		onClick={toggle}
		aria-label={isOpen ? "Close menu" : "Open menu"}
		style={{
			background: "transparent",
			border: "none",
			cursor: "pointer",
			...props.style,
		}}
	>
		<svg width="20" height="20" viewBox="0 0 20 20">
			<Path variants={pathVariants} animate={isOpen ? "open" : "closed"} />
			<Path
				d="M 2 9.423 L 20 9.423"
				variants={middlePathVariants}
				animate={isOpen ? "open" : "closed"}
				transition={{ duration: 0.1 }}
			/>
			<Path variants={pathVariants} animate={isOpen ? "open" : "closed"} />
		</svg>
	</motion.button>
);
