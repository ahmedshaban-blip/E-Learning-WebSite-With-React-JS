import React from "react";

const MyButton = ({ children, disabled, bgColor, textColor, ...restProps }) => {
	return (
		<button
			className={`bg-[${bgColor}] w-auto hover:brightness-110 ${textColor} font-bold py-2 px-4 rounded focus:outline-none focus:ring-0 w-full disabled:opacity-50 disabled:cursor-not-allowed`}
			disabled={disabled}
			{...restProps}
		>
			{children}
		</button>
	);
};

export default MyButton;
