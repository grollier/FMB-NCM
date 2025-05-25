"use client";

import {
	Stack,
	Box,
	useDisclosure,
	Heading,
	Text,
	Card,
	Link,
} from "@chakra-ui/react";
import { useAuth } from "@/app/hooks/use-auth";

export default function DashboardClient() {
	const { isLoading, user } = useAuth();

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	return (
		<Box>
			<Box padding="2rem">
				<Heading size="md" mb="5">
					Welcome to the Dashboard
				</Heading>
				<Text color="offRed">
					This is the Dashboard... an it is empty, but worry not! I'm working on
					it
				</Text>
			</Box>
		</Box>
	);
}
