import { motion } from "motion/react";
import {
	colors,
	itemVariants,
} from "../admin/admin-items/drawer/motion-variants";
type MenuItemProps = {
	index: number;
};

export const MenuItem = ({ index }: MenuItemProps) => {
	const border = `2px solid ${colors[index]}`;

	return (
		<motion.li
			style={{
				display: "flex",
				alignItems: "center",
				marginBottom: "20px",
				cursor: "pointer",
				listStyle: "none",
				padding: 0,
			}}
			variants={itemVariants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<div
				style={{
					width: 40,
					height: 40,
					borderRadius: "50%",
					border,
					marginRight: "20px",
				}}
			/>
			<div
				style={{
					width: 200,
					height: 20,
					borderRadius: 5,
					border,
				}}
			/>
		</motion.li>
	);
};
