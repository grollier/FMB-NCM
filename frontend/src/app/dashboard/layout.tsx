import { Flex, Box } from "@chakra-ui/react";
import DashboardNavbar from "@/components/admin/admin-items/navbar/navbar";
import { Provider } from "@/providers/chakra";
import { AuthProvider } from "@/providers/auth-provider";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Provider>
			<AuthProvider>
				<Flex direction="column" minH="100vh">
					<DashboardNavbar />
					<Box flex="1" p={4}>
						{children}
					</Box>
				</Flex>
			</AuthProvider>
		</Provider>
	);
}
