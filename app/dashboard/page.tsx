import { ExpenseGraph } from './components/ExpenseGraph';
import { ExpenseList } from './components/ExpenseList';
import { GoalsTracker } from './components/GoalsTracker';

export default function Dashboard() {
	const data = [
		{ month: 'Jan', expenses: 4000 },
		{ month: 'Feb', expenses: 3000 },
		{ month: 'Mar', expenses: 2000 },
		{ month: 'Apr', expenses: 2780 },
		{ month: 'May', expenses: 1890 },
		{ month: 'Jun', expenses: 2390 },
		];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseGraph data={data} height={300} width={300}/>
        <GoalsTracker />
        <div className="lg:col-span-2">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}
