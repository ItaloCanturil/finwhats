interface sidebarItemProps {
	icon: React.ReactNode;
	text: string;
	alert?: number;
	active?: boolean;
	onClick?: () => void;
}

const sidebarItem = ({
	icon,
	text,
	alert,
	active,
	onClick,
}: sidebarItemProps) => {
	return (
		<div
			className={`flex items-center my-1 px-4 py-[1rem] rounded-md cursor-pointer transition-colors duration-200 ${
				active
					? "bg-gradient-to-r from-slate-900 to-gray-700 text-white"
					: "text-gray-500 hover:bg-gray-700 hover:text-white"
			}`}
		>
			{icon}
			<span className="ml-4 font-medium flex-1">{text}</span>
			{alert && (
				<span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-full">
					{alert}
				</span>
			)}
		</div>
	);
};

export default sidebarItem;
