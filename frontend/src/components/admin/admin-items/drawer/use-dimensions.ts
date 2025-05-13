import { useEffect, useRef, useState } from "react";

export const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			if (ref.current) {
				setDimensions({
					width: ref.current.offsetWidth,
					height: ref.current.offsetHeight,
				});
			}
		};

		const resizeObserver = new ResizeObserver(updateDimensions);
		if (ref.current) resizeObserver.observe(ref.current);

		updateDimensions();
		return () => resizeObserver.disconnect();
	}, [ref]);

	return dimensions;
};
