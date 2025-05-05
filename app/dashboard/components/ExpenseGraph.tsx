'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface GraphProps {
  width: number;
  height: number;
  data: { month: string; expenses: number }[];
}

export function ExpenseGraph(props: GraphProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <BarChart width={props.width} height={props.height} data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
    </div>
  );
}