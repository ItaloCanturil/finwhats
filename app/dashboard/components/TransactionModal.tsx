"use client";

import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, Loader2Icon } from "lucide-react";
import { addTransaction } from "@/features/transactions/actions";

const INCOME_CATEGORIES = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Aluguel",
    "Negócios",
    "Outro",
] as const;

const EXPENSE_CATEGORIES = [
    "Alimentação",
    "Moradia",
    "Transporte",
    "Utilidades",
    "Entretenimento",
    "Saúde",
    "Educação",
    "Compras",
    "Outro",
] as const;

type TransactionType = "income" | "expense";
type RecurrenceType = "none" | "subscription" | "installment";

function getCurrentMonthValue(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
}

function monthValueToReferenceMonth(monthValue: string): string {
    return `${monthValue}-01`;
}

export function TransactionModal() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<TransactionType>("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [monthValue, setMonthValue] = useState(getCurrentMonthValue);
    const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>("none");
    const [installmentCurrent, setInstallmentCurrent] = useState("");
    const [installmentTotal, setInstallmentTotal] = useState("");
    const [isPending, startTransition] = useTransition();

    const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const resetForm = () => {
        setCategory("");
        setAmount("");
        setDescription("");
        setMonthValue(getCurrentMonthValue());
        setRecurrenceType("none");
        setInstallmentCurrent("");
        setInstallmentTotal("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!category || !amount) return;
        if (
            recurrenceType === "installment" &&
            (!installmentCurrent || !installmentTotal)
        )
            return;

        startTransition(async () => {
            try {
                await addTransaction({
                    type,
                    category,
                    amount: parseFloat(amount),
                    description: description || undefined,
                    referenceMonth: monthValueToReferenceMonth(monthValue),
                    recurrenceType,
                    installmentCurrent:
                        recurrenceType === "installment"
                            ? parseInt(installmentCurrent, 10)
                            : undefined,
                    installmentTotal:
                        recurrenceType === "installment"
                            ? parseInt(installmentTotal, 10)
                            : undefined,
                });
                resetForm();
                setOpen(false);
            } catch (error) {
                console.error("Failed to add transaction:", error);
            }
        });
    };

    const recurrenceButtons: { label: string; value: RecurrenceType }[] = [
        { label: "Nenhuma", value: "none" },
        { label: "Assinatura", value: "subscription" },
        { label: "Parcelamento", value: "installment" },
    ];

    const isSubmitDisabled =
        isPending ||
        !category ||
        !amount ||
        (recurrenceType === "installment" &&
            (!installmentCurrent || !installmentTotal));

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon className="size-4" />
                    Nova Transação
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova receita ou despesa aos seus registros.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Type Toggle */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setType("income");
                                setCategory("");
                                setRecurrenceType("none");
                            }}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${type === "income"
                                ? "bg-emerald-500 text-white shadow-sm"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Receita
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setType("expense");
                                setCategory("");
                            }}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${type === "expense"
                                ? "bg-rose-500 text-white shadow-sm"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Despesa
                        </button>
                    </div>

                    {/* Month Picker */}
                    <div className="space-y-2">
                        <Label htmlFor="month">Mês</Label>
                        <Input
                            id="month"
                            type="month"
                            value={monthValue}
                            onChange={(e) => setMonthValue(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="ex: Salário mensal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Recurrence Type */}
                    {type === "expense" && (
                        <div className="space-y-2">
                            <Label>Recorrência</Label>
                            <div className="flex gap-1">
                                {recurrenceButtons.map((btn) => (
                                    <button
                                        key={btn.value}
                                        type="button"
                                        onClick={() => setRecurrenceType(btn.value)}
                                        className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${recurrenceType === btn.value
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Installment Fields */}
                    {recurrenceType === "installment" && (
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="installmentCurrent">
                                    Parcela atual
                                </Label>
                                <Input
                                    id="installmentCurrent"
                                    type="number"
                                    min="1"
                                    placeholder="ex: 3"
                                    value={installmentCurrent}
                                    onChange={(e) =>
                                        setInstallmentCurrent(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="installmentTotal">
                                    Total de parcelas
                                </Label>
                                <Input
                                    id="installmentTotal"
                                    type="number"
                                    min="1"
                                    placeholder="ex: 10"
                                    value={installmentTotal}
                                    onChange={(e) =>
                                        setInstallmentTotal(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Amount */}
                    <div className="space-y-2">
                        <Label htmlFor="amount">Valor (R$)</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className={
                                type === "income"
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : "bg-rose-500 hover:bg-rose-600"
                            }
                        >
                            {isPending ? (
                                <>
                                    <Loader2Icon className="size-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                `Adicionar ${type === "income" ? "Receita" : "Despesa"}`
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
