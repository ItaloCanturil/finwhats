"use client";

import {
	ArrowRightLeft,
	BarChart2,
	FileText,
	KanbanSquare,
	LayoutDashboard,
	Search,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<string | null>("Dashboard");
	const [isOpen, setIsOpen] = useState(false);

	const handleItemClick = (itemName: string) => {
		setActiveItem(itemName);
		setIsOpen(false);
	};

	const menuItems = [
		{ name: "Painel", icon: <LayoutDashboard size={20} /> },
		{ name: "Análises", icon: <BarChart2 size={20} />, alert: 20 },
		{ name: "Transações", icon: <ArrowRightLeft size={20} /> },
		{ name: "Faturas", icon: <FileText size={20} /> },
	];
	return (
		<>
			{/* Mobile Header bar */}
			<div className="md:hidden flex items-center justify-between bg-white border-b px-4 py-3 w-full z-30">
				<div className="flex items-center">
					<div className="bg-green-500 p-1.5 rounded-lg mr-2">
						<KanbanSquare size={20} className="text-white" />
					</div>
					<h1 className="text-xl font-bold">FinWhats</h1>
				</div>
				<button
					className="p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Alternar Menu"
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Sidebar Container */}
			<div
				className={`
					fixed inset-y-0 left-0 z-40 transform bg-white transition-transform duration-300 ease-in-out
					md:relative md:translate-x-0
					${isOpen ? "translate-x-0" : "-translate-x-full"}
					h-full flex flex-col gap-6 w-[280px] py-6 border-r shadow-2xl md:shadow-none
				`}
			>
				<div className="hidden md:flex flex-row items-center px-6">
					<div className="bg-green-500 p-2 rounded-lg mr-3">
						<KanbanSquare size={24} className="text-white" />
					</div>
					<h1 className="text-2xl font-bold">FinWhats</h1>
				</div>

				<div className="relative px-4 mt-2 md:mt-0">
					<Search
						size={20}
						className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400"
					/>
					<input
						type="text"
						placeholder="Buscar"
						className="w-full p-2 pl-10 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
				</div>

				<div className="flex-1 mt-2 px-2">
					<h2 className="text-xs font-semibold text-gray-500 uppercase mb-4 px-4">
						Menu Principal
					</h2>
					<div className="flex flex-col gap-1">
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
			</div>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
					onClick={() => setIsOpen(false)}
					aria-hidden="true"
				/>
			)}
		</>
	);
};

export default Sidebar;
