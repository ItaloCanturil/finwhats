import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ConnectWhatsappModal } from "./components/ConnectWhatsappModal";

export default async function Home() {
	const { userId } = await auth();
	if (!userId) {
		redirect("/login");
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
			<h1 className="text-3xl font-bold text-center">WhatsApp Finance</h1>
			<p className="text-gray-600 text-center max-w-md">
				Manage your finances easily through WhatsApp messages
			</p>
			<div className="flex flex-col gap-4 w-full max-w-xs">

				<ConnectWhatsappModal/>
				<Link
					href="/dashboard"
					className="bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600 transition-colors"
				>
					Go to Dashboard
				</Link>
			</div>
		</main>
	);
}
