"use client";

import { useState, useMemo, useTransition } from "react";
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
    ChevronLeftIcon,
    ChevronRightIcon,
    RepeatIcon,
    CreditCardIcon,
    TrendingUpIcon,
} from "lucide-react";
import { removeTransaction } from "@/features/transactions/actions";

type TransactionType = "income" | "expense";
type RecurrenceType = "none" | "subscription" | "installment";
type PeriodType = "week" | "month" | "year";

interface Transaction {
    id: string;
    type: TransactionType;
    category: string;
    description: string | null;
    amount: string;
    reference_month: string;
    recurrence_type: RecurrenceType;
    installment_current: number | null;
    installment_total: number | null;
    created_at: Date;
}

interface TransactionListCardProps {
    transactions: Transaction[];
}

type FilterType = "all" | TransactionType;

// ── Date helpers ──────────────────────────────────────────────

function getWeekRange(date: Date): { start: Date; end: Date } {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
}

function shiftWeek(date: Date, direction: number): Date {
    const shifted = new Date(date);
    shifted.setDate(shifted.getDate() + direction * 7);
    return shifted;
}

function shiftMonth(date: Date, direction: number): Date {
    const shifted = new Date(date);
    shifted.setMonth(shifted.getMonth() + direction);
    return shifted;
}

function shiftYear(date: Date, direction: number): Date {
    const shifted = new Date(date);
    shifted.setFullYear(shifted.getFullYear() + direction);
    return shifted;
}

function formatPeriodLabel(date: Date, period: PeriodType): string {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    if (period === "week") {
        const { start, end } = getWeekRange(date);
        const startStr = new Intl.DateTimeFormat("pt-BR", {
            day: "numeric",
            month: "short",
        }).format(start);
        const endStr = fmt.format(end);
        return `${startStr} – ${endStr}`;
    }
    if (period === "month") {
        return new Intl.DateTimeFormat("pt-BR", {
            month: "long",
            year: "numeric",
        }).format(date);
    }
    return date.getFullYear().toString();
}

/** Parse "YYYY-MM-DD" as a local-timezone date (avoids UTC shift). */
function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
}

function isInPeriod(
    txDate: Date,
    anchor: Date,
    period: PeriodType
): boolean {
    if (period === "week") {
        // reference_month is always the 1st, so check if the week
        // falls within the same month as the transaction
        const { start, end } = getWeekRange(anchor);
        const txYear = txDate.getFullYear();
        const txMonth = txDate.getMonth();
        return (
            (start.getFullYear() === txYear && start.getMonth() === txMonth) ||
            (end.getFullYear() === txYear && end.getMonth() === txMonth)
        );
    }
    if (period === "month") {
        return (
            txDate.getFullYear() === anchor.getFullYear() &&
            txDate.getMonth() === anchor.getMonth()
        );
    }
    return txDate.getFullYear() === anchor.getFullYear();
}

// ── Component ─────────────────────────────────────────────────

export function TransactionListCard({ transactions }: TransactionListCardProps) {
    const [filter, setFilter] = useState<FilterType>("all");
    const [period, setPeriod] = useState<PeriodType>("month");
    const [anchorDate, setAnchorDate] = useState(() => new Date());
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const navigate = (direction: number) => {
        setAnchorDate((prev) => {
            if (period === "week") return shiftWeek(prev, direction);
            if (period === "month") return shiftMonth(prev, direction);
            return shiftYear(prev, direction);
        });
    };

    // Filter transactions
    const filtered = useMemo(() => {
        return transactions.filter((t) => {
            const txDate = parseLocalDate(t.reference_month);
            if (!isInPeriod(txDate, anchorDate, period)) return false;
            if (filter !== "all" && t.type !== filter) return false;
            return true;
        });
    }, [transactions, anchorDate, period, filter]);

    // Insight: highest spending or income month
    const insight = useMemo(() => {
        const monthMap = new Map<string, { income: number; expense: number; label: string }>();

        for (const t of transactions) {
            const date = parseLocalDate(t.reference_month);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (!monthMap.has(key)) {
                const label = new Intl.DateTimeFormat("pt-BR", {
                    month: "short",
                    year: "numeric",
                }).format(date);
                monthMap.set(key, { income: 0, expense: 0, label });
            }
            const entry = monthMap.get(key)!;
            const amount = parseFloat(t.amount);
            if (t.type === "income") entry.income += amount;
            else entry.expense += amount;
        }

        if (monthMap.size === 0) return null;

        const activeType = filter === "income" ? "income" : "expense";
        let best: { label: string; amount: number } | null = null;

        for (const [, data] of monthMap) {
            const value = activeType === "income" ? data.income : data.expense;
            if (!best || value > best.amount) {
                best = { label: data.label, amount: value };
            }
        }

        if (!best || best.amount === 0) return null;

        const formattedAmount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(best.amount);

        return {
            type: activeType === "income" ? "receitas" : "despesas",
            label: best.label,
            amount: formattedAmount,
        };
    }, [transactions, filter]);

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
        { label: "Todas", value: "all" },
        { label: "Receitas", value: "income" },
        { label: "Despesas", value: "expense" },
    ];

    const periodButtons: { label: string; value: PeriodType }[] = [
        { label: "Semana", value: "week" },
        { label: "Mês", value: "month" },
        { label: "Ano", value: "year" },
    ];

    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <FilterIcon className="size-4 text-muted-foreground" />
                        Transações
                    </CardTitle>
                    {/* Period selector */}
                    <div className="flex gap-1">
                        {periodButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setPeriod(btn.value)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${period === btn.value
                                    ? "bg-slate-900 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation + period label */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeftIcon className="size-4 text-gray-500" />
                    </button>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                        {formatPeriodLabel(anchorDate, period)}
                    </span>
                    <button
                        onClick={() => navigate(1)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRightIcon className="size-4 text-gray-500" />
                    </button>
                </div>

                {/* Type filter */}
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

                {/* Insight */}
                {insight && (
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-gray-50 rounded-md px-2.5 py-1.5">
                        <TrendingUpIcon className="size-3" />
                        <span>
                            Mês com maior {insight.type}:{" "}
                            <span className="font-semibold capitalize">
                                {insight.label}
                            </span>{" "}
                            ({insight.amount})
                        </span>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <InboxIcon className="size-10 mb-3 opacity-40" />
                        <p className="text-sm font-medium">Nenhuma transação encontrada</p>
                        <p className="text-xs mt-1">
                            {filter === "all"
                                ? "Nenhuma transação neste período."
                                : `Nenhum registro de ${filter === "income" ? "receitas" : "despesas"} neste período.`}
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
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-sm font-medium">
                                                {transaction.description || transaction.category}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] px-1.5 py-0"
                                            >
                                                {transaction.category}
                                            </Badge>
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
                                            {transaction.recurrence_type === "subscription" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-[10px] px-1.5 py-0 gap-0.5"
                                                >
                                                    <RepeatIcon className="size-2.5" />
                                                    Assinatura
                                                </Badge>
                                            )}
                                            {transaction.recurrence_type === "installment" &&
                                                transaction.installment_current &&
                                                transaction.installment_total && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-[10px] px-1.5 py-0 gap-0.5"
                                                    >
                                                        <CreditCardIcon className="size-2.5" />
                                                        {transaction.installment_current}/
                                                        {transaction.installment_total}
                                                    </Badge>
                                                )}
                                        </div>
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
