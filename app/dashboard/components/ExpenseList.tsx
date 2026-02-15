'use client';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

const expenses: Expense[] = [
  {
    id: '1',
    description: 'Groceries',
    amount: 150.00,
    date: '2024-01-15',
    category: 'Food'
  },
  {
    id: '2',
    description: 'Internet Bill',
    amount: 89.99,
    date: '2024-01-14',
    category: 'Utilities'
  },
  {
    id: '3',
    description: 'Gas',
    amount: 45.50,
    date: '2024-01-13',
    category: 'Transportation'
  }
];

export function ExpenseList() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
            <div>
              <h3 className="font-medium">{expense.description}</h3>
              <p className="text-sm text-gray-500">{expense.category}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-600">${expense.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
