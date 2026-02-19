import { BarChart3Icon, InboxIcon, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    message?: string;
    description?: string;
    variant?: "default" | "dark";
}

export function EmptyState({
    icon: Icon = InboxIcon,
    message = "No data yet",
    description,
    variant = "default",
}: EmptyStateProps) {
    const isDark = variant === "dark";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Icon
                className={`size-5 mb-1 ${isDark ? "text-slate-500" : "text-muted-foreground/40"}`}
            />
            <p
                className={`text-[11px] font-medium ${isDark ? "text-slate-500" : "text-muted-foreground/60"}`}
            >
                {message}
            </p>
            {description && (
                <p
                    className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-muted-foreground/40"}`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

/** Pre-configured empty state for chart areas */
export function EmptyChartState({ variant = "default" }: Pick<EmptyStateProps, "variant">) {
    return <EmptyState icon={BarChart3Icon} message="No data yet" variant={variant} />;
}
