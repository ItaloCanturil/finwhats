"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    Trash2Icon,
    Loader2Icon,
    FilterIcon,
    InboxIcon,
} from "lucide-react";
import { removeTransaction } from "@/actions/transaction";

type TransactionType = "income" | "expense";

interface Transaction {
    id: string;
    type: "income" | "expense";
    category: string;
    description: string | null;
    amount: string;
    created_at: Date;
}

interface TransactionListCardProps {
    transactions: Transaction[];
}

type FilterType = "all" | TransactionType;

export function TransactionListCard({ transactions }: TransactionListCardProps) {
    const [filter, setFilter] = useState<FilterType>("all");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filtered =
        filter === "all"
            ? transactions
            : transactions.filter((t) => t.type === filter);

    const formatCurrency = (value: string) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(parseFloat(value));
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const handleDelete = (id: string) => {
        setDeletingId(id);
        startTransition(async () => {
            try {
                await removeTransaction(id);
            } catch (error) {
                console.error("Failed to remove transaction:", error);
            } finally {
                setDeletingId(null);
            }
        });
    };

    const filterButtons: { label: string; value: FilterType }[] = [
        { label: "All", value: "all" },
        { label: "Income", value: "income" },
        { label: "Expense", value: "expense" },
    ];

    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FilterIcon className="size-4 text-muted-foreground" />
                    Transactions
                </CardTitle>
                <div className="flex gap-1">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setFilter(btn.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${filter === btn.value
                                    ? btn.value === "income"
                                        ? "bg-emerald-500 text-white"
                                        : btn.value === "expense"
                                            ? "bg-rose-500 text-white"
                                            : "bg-slate-900 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <InboxIcon className="size-10 mb-3 opacity-40" />
                        <p className="text-sm font-medium">No transactions found</p>
                        <p className="text-xs mt-1">
                            {filter === "all"
                                ? "Add your first transaction to get started."
                                : `No ${filter} records yet.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                        {filtered.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`p-1.5 rounded-full ${transaction.type === "income"
                                                ? "bg-emerald-100"
                                                : "bg-rose-100"
                                            }`}
                                    >
                                        {transaction.type === "income" ? (
                                            <ArrowUpIcon className="size-3.5 text-emerald-600" />
                                        ) : (
                                            <ArrowDownIcon className="size-3.5 text-rose-600" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium">
                                                {transaction.category}
                                            </p>
                                            <Badge
                                                variant={
                                                    transaction.type === "income"
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className="text-[10px] px-1.5 py-0"
                                            >
                                                {transaction.type}
                                            </Badge>
                                        </div>
                                        {transaction.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {transaction.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {formatDate(transaction.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-sm font-semibold ${transaction.type === "income"
                                                ? "text-emerald-600"
                                                : "text-rose-600"
                                            }`}
                                    >
                                        {transaction.type === "income" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => handleDelete(transaction.id)}
                                        disabled={isPending && deletingId === transaction.id}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                    >
                                        {isPending && deletingId === transaction.id ? (
                                            <Loader2Icon className="size-3 animate-spin" />
                                        ) : (
                                            <Trash2Icon className="size-3" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
