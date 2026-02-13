import Sidebar from "./components/sidebar";
import { OverviewCards } from "./components/OverviewCards";
export default function Dashboard() {
	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-8 overflow-y-auto">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Overview</h1>
				<OverviewCards />
			</main>
		</div>
	);
}
