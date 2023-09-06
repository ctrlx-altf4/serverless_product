import * as React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "primary";
}
function Button(props: ButtonProps) {
  const { className, variant = "primary", ...otherProps } = props;

  const variantProps = {
    outlined: "hover:shadow-md hover:bg-neutral-50  border-black border ",
    primary:
      "hover:shadow hover:shadow-neutral-700 hover:bg-black text-white bg-neutral-800  ",
  };
  return (
    <button
      type="button"
      className={`py-2  px-2 min-w-[120px]  disabled:bg-neutral-500 text-sm  rounded-md ${variantProps[variant]} ${className}`}
      {...otherProps}
    />
  );
}

Button.displayName = "button";

export default Button;
