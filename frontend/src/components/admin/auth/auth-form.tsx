"use client";

import { useAuth } from "@/app/hooks/use-auth";
import { useState } from "react";
import { Button, Input, Stack, Fieldset, Field } from "@chakra-ui/react";
import { MotionValue, animate, useMotionValue } from "motion/react";

export default function AuthForm() {
	const { login, isLoading, error } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const opacity = useMotionValue(0);
	const y = useMotionValue(20);

	useState(() => {
		animate(opacity, 1, { duration: 0.4 });
		animate(y, 0, { duration: 0.4 });
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await login(username, password);
	};

	return (
		<div
			style={{
				opacity: opacity as unknown as number,
				transform: `translateY(${y.get()}px)`,
			}}
		>
			<form onSubmit={handleSubmit}>
				<Fieldset.Root size="lg" invalid={!!error}>
					<Fieldset.Legend fontSize="2xl" fontWeight="bold">
						Log In
					</Fieldset.Legend>

					<Fieldset.Content mt={4}>
						<Stack gap={4}>
							<Field.Root invalid={!username && !!error}>
								<Field.Label>Username</Field.Label>
								<Input
									name="username"
									placeholder="Enter your username"
									variant="subtle"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									autoFocus
								/>
							</Field.Root>

							<Field.Root invalid={!password && !!error}>
								<Field.Label>Password</Field.Label>
								<Input
									name="password"
									type="password"
									variant="subtle"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</Field.Root>

							<Button
								type="submit"
								width="full"
								colorScheme="teal"
								loading={isLoading}
								loadingText="Signing in..."
							>
								Continue
							</Button>
						</Stack>
					</Fieldset.Content>

					{error && (
						<Fieldset.ErrorText
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.2 }}
							mt={2}
							color="colorPalette.warning"
						>
							{error}
						</Fieldset.ErrorText>
					)}
				</Fieldset.Root>
			</form>
		</div>
	);
}
