'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EmptyState } from '@/components/ui/empty-state';
import { TargetIcon } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  target_amount: string;
  created_at: Date;
}

interface GoalsTrackerProps {
  goals: Goal[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A855F7', '#EC4899'];

export function GoalsTracker({ goals }: GoalsTrackerProps) {
  if (goals.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
        <div className="py-12">
          <EmptyState
            icon={TargetIcon}
            message="No goals yet"
            description="Set your first financial goal to start tracking."
          />
        </div>
      </div>
    );
  }

  const pieData = goals.map(goal => ({
    name: goal.name,
    value: parseFloat(goal.target_amount),
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4">
          {goals.map((goal, index) => {
            const target = parseFloat(goal.target_amount);
            return (
              <div key={goal.id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {goal.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-teal-600">
                    Target:{' '}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(target)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
