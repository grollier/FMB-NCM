import { Provider } from "@/providers/chakra";
import { AuthProvider } from "@/providers/auth-provider";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="eng" suppressHydrationWarning>
            <body>
                <Provider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Provider>
            </body>
        </html>
    )
}