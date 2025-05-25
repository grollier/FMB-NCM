import { useRef } from "react";
import { useAuth } from "@/app/hooks/use-auth";
import { Menu, Portal, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export const UserMenu = () => {
	const { user, logout } = useAuth();
	const router = useRouter();
    const triggerRef = useRef<HTMLButtonElement>(null)

	const handleLogout = async () => {
		await logout();
		router.push("/auth/login");
	};

    const getAnchorRect = () => {
        if (!triggerRef.current) return DOMRect.fromRect({ width: 0, height: 0 });
        const rect = triggerRef.current.getBoundingClientRect();
        return new DOMRect(rect.left, rect.bottom + 8, rect.width, rect.height)
    };

	return (
		<Menu.Root positioning={{ getAnchorRect }}>
			<Menu.Trigger asChild>
				<Button
                    ref={triggerRef}
                    variant="ghost"
                    color="white"
                    _hover={{ bg: "bg.info" }}
                >
                    {user?.username || "Welcome"}
                </Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content
						minW="200px"
						bg="white"
						boxShadow="xl"
						borderRadius="md"
						zIndex="dropdown"
                        _focusVisible={{ outline: "none" }}
					>
						<Menu.Item
							onClick={handleLogout}
							value="log-out"
							color="fg.warning"
							_hover={{ bg: "bg.warning", color: "colorPalette.error" }}
							py={3}
							px={4}
						>
							<LuLogOut style={{ marginRight: "12px" }} />
							<Text fontWeight="medium" color="fg.warning">
								Log Out
							</Text>
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
