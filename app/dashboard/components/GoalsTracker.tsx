'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

const goals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    target: 10000,
    current: 6000,
    deadline: '2024-06-30'
  },
  {
    id: '2',
    name: 'New Car',
    target: 25000,
    current: 5000,
    deadline: '2024-12-31'
  },
  {
    id: '3',
    name: 'Vacation',
    target: 5000,
    current: 3500,
    deadline: '2024-08-15'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export function GoalsTracker() {
  const pieData = goals.map(goal => ({
    name: goal.name,
    value: (goal.current / goal.target) * 100
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        
        <div className="flex-1 space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{goal.name}</h3>
                  <span className="text-sm text-gray-500">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-teal-600">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
