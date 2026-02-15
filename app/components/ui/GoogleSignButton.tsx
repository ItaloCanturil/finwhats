"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";

interface GoogleSignButtonProps {
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	text?: string;
}

const GoogleSignButton = ({
	onClick,
	disabled = false,
	className,
	text = "Entrar com Google",
}: GoogleSignButtonProps) => {
	return (
		<Button
			variant="outline"
			size="default"
			onClick={onClick}
			disabled={disabled}
			className={`flex items-center justify-center gap-3 w-full border-gray-300 hover:bg-gray-50 bg-white rounded-md shadow-md bg-white text-gray-700 ${className}`}
		>
			<Image
				src="/google-icon-logo-svgrepo-com.svg"
				alt="Google"
				width={20}
				height={20}
				className="w-5 h-5"
			/>
			<span className="font-medium">{text}</span>
		</Button>
	);
};

export default GoogleSignButton;
