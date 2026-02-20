"use client";

import {
	ArrowRightLeft,
	BarChart2,
	FileText,
	KanbanSquare,
	LayoutDashboard,
	Search,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<string | null>("Dashboard");

	const handleItemClick = (itemName: string) => {
		setActiveItem(itemName);
	};

	const menuItems = [
		{ name: "Dashboard", icon: <LayoutDashboard size={20} /> },
		{ name: "Analytics", icon: <BarChart2 size={20} />, alert: 20 },
		{ name: "Transactions", icon: <ArrowRightLeft size={20} /> },
		{ name: "Invoices", icon: <FileText size={20} /> },
	];
	return (
		<div className="h-full flex flex-col gap-6 max-w-68 px-2">
			<div className="flex items-center">
				<div className="bg-green-500 p-2 rounded-lg">
					<KanbanSquare size={24} className="text-white" />
				</div>
				<h1 className="text-2xl font-bold">Financial Dashboard</h1>
			</div>

			<div className="relative">
				<Search
					size={24}
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
				/>
				<input
					type="text"
					placeholder="Search"
					className="w-full p-2 pl-10 border border-gray-300 rounded-md"
				/>
			</div>

			<div className="flex-1">
				<h2 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-4">
					Menu Principal
				</h2>
				{menuItems.map((item) => (
					<SidebarItem
						key={item.name}
						icon={item.icon}
						text={item.name}
						alert={item.alert}
						active={activeItem == item.name}
						onClick={() => handleItemClick(item.name)}
					/>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
