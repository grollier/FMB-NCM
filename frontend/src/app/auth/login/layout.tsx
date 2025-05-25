import { Provider } from "@/providers/chakra";
import { AuthProvider } from "@/providers/auth-provider";

export default function LoginLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Provider>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	);
}
