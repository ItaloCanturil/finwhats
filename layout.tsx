import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<ClerkProvider>
					<div className="flex h-full flex-col overflow-hidden">{children}</div>
				</ClerkProvider>
			</body>
		</html>
	);
}
