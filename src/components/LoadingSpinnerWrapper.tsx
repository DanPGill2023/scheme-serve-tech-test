import type { PropsWithChildren } from "react";

type LoadingSpinnerWrapperProps = {
  isLoading: boolean;
  spinnerColor: string;
};

const LoadingSpinnerWrapper = ({
  children,
  isLoading,
  spinnerColor,
}: PropsWithChildren<LoadingSpinnerWrapperProps>) => {
  const spinnerClassNames = [
    "inline-block",
    "h-8",
    "w-8",
    "animate-spin",
    "rounded-full",
    "border-4",
    "border-solid",
    ...(spinnerColor ? [`text-${spinnerColor}`] : ["text-theme-purple"]),
    "border-current",
    "border-r-transparent",
    "align-[-0.125em]",
    "motion-reduce:animate-[spin_1.5s_linear_infinite]",
  ].join(" ");
  return isLoading ? (
    <div className="flex flex-1 justify-center items-center">
      <div className={spinnerClassNames} role="status"></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingSpinnerWrapper;
