"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import {
	type ButtonHTMLAttributes,
	type ReactNode,
	type CSSProperties,
} from "react";
import React from "react";

const buttonClasses = cva(
	"inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				primary:
					"bg-button-primary-background text-button-primary-text hover:bg-primary-background/90 focus:ring-primary-background",
				secondary:
					"bg-button-secondary-background text-button-secondary-text hover:bg-background-overlay-medium focus:ring-background-overlay-medium",
				outline:
					"border-2 border-primary-background text-primary-background bg-transparent hover:bg-primary-background/10 focus:ring-primary-background",
				danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
			},
			size: {
				small: "text-xs px-3 py-1.5",
				medium: "text-sm px-4 py-2",
				large: "text-md px-6 py-3",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "medium",
		},
	}
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonClasses> {
	text?: string;
	text_font_size?: string;
	text_font_family?: string;
	text_font_weight?: string;
	text_line_height?: string;
	text_text_align?: string;
	text_color?: string;
	fill_background_color?: string;
	border_border_radius?: string;
	effect_box_shadow?: string;

	layout_width?: string;
	padding?: string;
	position?: string;
	margin?: string;

	children?: ReactNode;
}

const Button = ({
	text = "Enviar",
	text_font_size = "text-sm",
	text_font_family = "Inter",
	text_font_weight = "font-medium",
	text_line_height = "leading-sm",
	text_text_align = "left",
	text_color = "text-button-secondary-text",
	fill_background_color = "bg-button-secondary-background",
	border_border_radius = "rounded-sm",
	effect_box_shadow = "shadow-[0px_1px_2px_#0700000c]",

	layout_width,
	padding,
	position,
	margin,

	// Standard React props
	variant,
	size,
	disabled = false,
	className,
	children,
	onClick,
	type = "button",
	...props
}: ButtonProps) => {
	// Safe validation for optional parameters
	const hasValidWidth =
		layout_width &&
		typeof layout_width === "string" &&
		layout_width.trim() !== "";
	const hasValidPadding =
		padding && typeof padding === "string" && padding.trim() !== "";
	const hasValidMargin =
		margin && typeof margin === "string" && margin.trim() !== "";
	const hasValidPosition =
		position && typeof position === "string" && position.trim() !== "";

	const optionalClasses = [
		hasValidWidth ? `w-[${layout_width}]` : "",
		hasValidPadding ? `p-[${padding}]` : "",
		hasValidMargin ? `m-[${margin}]` : "",
		hasValidPosition ? position : "",
	]
		.filter(Boolean)
		.join(" ");

	// Build custom styles for non-Tailwind properties
	const customStyles: CSSProperties = {
		// Only use inline styles for truly custom values
		...(text_font_family &&
			!text_font_family.startsWith("font-") && {
				fontFamily: text_font_family,
			}),
		...(text_text_align && { textAlign: text_text_align as any }),
	};

	// Build Tailwind classes for styling
	const styleClasses = [
		text_font_size,
		text_font_family.startsWith("font-") ? text_font_family : "",
		text_font_weight,
		text_line_height,
		text_color,
		// Only apply these if not using variant system
		!variant ? fill_background_color : "",
		border_border_radius,
		effect_box_shadow,
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) {
			event.preventDefault();
			return;
		}

		if (typeof onClick === "function") {
			onClick(event);
		}
	};

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={handleClick}
			style={customStyles}
			className={twMerge(
				buttonClasses({ variant, size }),
				styleClasses,
				optionalClasses,
				className
			)}
			aria-disabled={disabled}
			{...props}
		>
			{children || text}
		</button>
	);
};

export default Button;
