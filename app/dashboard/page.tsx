import Sidebar from "./components/sidebar";
import { OverviewCards } from "./components/OverviewCards";
import { TransactionModal } from "./components/TransactionModal";
import { TransactionListCard } from "./components/TransactionListCard";
import { getTransactions } from "@/actions/transaction";

export default async function Dashboard() {
	const transactions = await getTransactions();

	const income = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + parseFloat(t.amount), 0);

	const expense = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + parseFloat(t.amount), 0);

	const balance = income - expense;

	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-8 overflow-y-auto">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-gray-800">
						Financial Overview
					</h1>
					<TransactionModal />
				</div>
				<OverviewCards income={income} expense={expense} balance={balance} />
				<TransactionListCard transactions={transactions} />
			</main>
		</div>
	);
}
