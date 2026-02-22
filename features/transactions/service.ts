export type MonthlyChartData = {
    month: string;
    income: number;
    expense: number;
};

export function aggregateMonthlyData(
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
