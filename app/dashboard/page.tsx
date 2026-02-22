import Sidebar from "./components/sidebar";
import { OverviewCards } from "./components/OverviewCards";
import { TransactionModal } from "./components/TransactionModal";
import { TransactionListCard } from "./components/TransactionListCard";
import { getTransactions } from "@/features/transactions/actions";
import { aggregateMonthlyData } from "@/features/transactions/service";

export default async function Dashboard() {
	const transactions = await getTransactions();

	const income = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + parseFloat(t.amount), 0);

	const expense = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + parseFloat(t.amount), 0);

	const balance = income - expense;

	const monthlyData = aggregateMonthlyData(transactions);

	return (
		<div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
			<Sidebar />
			<main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
					<h1 className="text-2xl font-bold text-gray-800">
						Visão Geral
					</h1>
					<TransactionModal />
				</div>
				<OverviewCards
					income={income}
					expense={expense}
					balance={balance}
					monthlyData={monthlyData}
				/>
				<TransactionListCard transactions={transactions} />
			</main>
		</div>
	);
}
