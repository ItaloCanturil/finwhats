import Sidebar from "./components/sidebar";
import { OverviewCards } from "./components/OverviewCards";
import type { MonthlyChartData } from "./components/OverviewCards";
import { TransactionModal } from "./components/TransactionModal";
import { TransactionListCard } from "./components/TransactionListCard";
import { getTransactions } from "@/actions/transaction";

function aggregateMonthlyData(
	transactions: { type: "income" | "expense"; amount: string; reference_month: string }[]
): MonthlyChartData[] {
	const monthLabels = [
		"Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
		"Jul", "Ago", "Set", "Out", "Nov", "Dez",
	] as const;

	const monthMap = new Map<string, { income: number; expense: number; sortKey: number }>();

	for (const t of transactions) {
		const date = new Date(t.reference_month);
		const year = date.getFullYear();
		const monthIndex = date.getMonth();
		const key = `${year}-${monthIndex}`;

		if (!monthMap.has(key)) {
			monthMap.set(key, { income: 0, expense: 0, sortKey: year * 12 + monthIndex });
		}

		const entry = monthMap.get(key)!;
		const amount = parseFloat(t.amount);

		if (t.type === "income") {
			entry.income += amount;
		} else {
			entry.expense += amount;
		}
	}

	return Array.from(monthMap.entries())
		.sort(([, a], [, b]) => a.sortKey - b.sortKey)
		.slice(-12)
		.map(([key, data]) => {
			const monthIndex = parseInt(key.split("-")[1], 10);
			return {
				month: monthLabels[monthIndex],
				income: Math.round(data.income * 100) / 100,
				expense: Math.round(data.expense * 100) / 100,
			};
		});
}

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
