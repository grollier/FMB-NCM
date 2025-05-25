import { motion } from "motion/react";
import { MenuItem } from "@/components/items/menu-item";
import { navVariants } from "./motion-variants";

export const DrawerContent = ({ isOpen }: { isOpen: boolean }) => (
	<motion.ul
		className="absolute top-20 left-6 list-none p-0 m-0 w-[500px]"
		variants={navVariants}
		initial="closed"
		animate={isOpen ? "open" : "closed"}
	>
		{[0, 1, 2, 3, 4].map((i) => (
			<MenuItem key={i} index={i} />
		))}
	</motion.ul>
);
