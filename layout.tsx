import React from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<div className="flex h-full flex-col overflow-hidden">{children}</div>
			</body>
		</html>
	);
}
