import AuthForm from "@/components/admin/auth/auth-form";
import { Flex, Box, Center, Heading, Stack } from "@chakra-ui/react";

export default function LoginPage() {
	return (
		<Flex justify="center" align="center" height="100vh" direction="column">
			<Box position="relative" borderRadius="md" boxShadow="md" p="8">
				<Center colorPalette="background" p="2" color="white">
					<Stack>
						<AuthForm />
					</Stack>
				</Center>
			</Box>
		</Flex>
	);
}
