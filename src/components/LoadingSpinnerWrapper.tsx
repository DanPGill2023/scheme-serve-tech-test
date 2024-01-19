import type { PropsWithChildren } from "react";

type LoadingSpinnerWrapperProps = {
  isLoading: boolean;
  spinnerColor?: string;
};

const LoadingSpinnerWrapper = ({
  children,
  isLoading,
  spinnerColor,
}: PropsWithChildren<LoadingSpinnerWrapperProps>) => {
  return isLoading ? (
    <div className="flex flex-1 justify-center items-center">
      <div
        style={{ color: spinnerColor }}
        className="inline-block h-8 w-8 text-theme-purple animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingSpinnerWrapper;
