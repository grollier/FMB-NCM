"use client";

import { ChakraProvider, Theme } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme/index";

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange>
			<ChakraProvider value={system}>{children}</ChakraProvider>
		</ThemeProvider>
	);
}
