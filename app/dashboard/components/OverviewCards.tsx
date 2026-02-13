
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/components/ui/chart";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, TrendingUpIcon } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartConfig = {
    income: {
        label: "Income",
        color: "#10b981", // emerald-500
    },
    expense: {
        label: "Expense",
        color: "#f43f5e", // rose-500
    },
} satisfies ChartConfig;

// Mock data for the chart
const chartData = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 3000, expense: 1398 },
    { month: "Mar", income: 2000, expense: 9800 },
    { month: "Apr", income: 2780, expense: 3908 },
    { month: "May", income: 1890, expense: 4800 },
    { month: "Jun", income: 2390, expense: 3800 },
    { month: "Jul", income: 3490, expense: 4300 },
];

export function OverviewCards() {
    // Mock data - replace with real data fetching later
    const data = {
        income: 5240.50,
        expense: 2350.20,
        balance: 2890.30,
        incomeChange: 12.5,
        expenseChange: -5.2,
        balanceChange: 8.4,
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Income Card */}
            <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Income
                    </CardTitle>
                    <div className="p-2 bg-emerald-100 rounded-full">
                        <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(data.income)}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <TrendingUpIcon className="w-3 h-3 mr-1 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">+{data.incomeChange}%</span> from last month
                    </p>
                    <div className="h-[80px] mt-4">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={chartData}>
                                <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Expense Card */}
            <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Expense
                    </CardTitle>
                    <div className="p-2 bg-rose-100 rounded-full">
                        <ArrowDownIcon className="w-4 h-4 text-rose-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(data.expense)}</div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <TrendingUpIcon className="w-3 h-3 mr-1 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">{Math.abs(data.expenseChange)}%</span> from last month
                    </p>
                    <div className="h-[80px] mt-4">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={chartData}>
                                <Bar dataKey="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Balance Card */}
            <Card className="bg-slate-900 border-slate-800 text-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-400">
                        Total Balance
                    </CardTitle>
                    <div className="p-2 bg-slate-800 rounded-full">
                        <DollarSignIcon className="w-4 h-4 text-white" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(data.balance)}</div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <TrendingUpIcon className="w-3 h-3 mr-1 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">+{data.balanceChange}%</span> from last month
                    </p>
                    <div className="h-[80px] mt-4">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <BarChart data={chartData}>
                                <Bar dataKey="income" stackId="a" fill="var(--color-income)" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="expense" stackId="a" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
