import React from "react";
import clsx from "clsx";

interface CommonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "lgModal" | "smModal";
}

const screenPaddingMap = {
  default: "px-[1.625rem]",
  lgModal: "px-[1.656rem]",
  smModal: "px-[5.406rem]",
};

const CommonCard = ({
  children,
  size = "default",
  className,
  ...props
}: CommonCardProps) => {
  return (
    <div className={clsx("w-full", screenPaddingMap[size])}>
      <div
        className={clsx(
          "w-full bg-white",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default CommonCard;
