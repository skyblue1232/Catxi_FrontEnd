import React from "react";
import clsx from "clsx";

interface CommonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "modal" | "small";
  padding?: "default" | "modal"; 
}

const sizeMap = {
  default: "w-[340px]",
  modal: "w-[340px]",
  small: "w-[220px]",
};

const paddingMap = {
  default: "p-[26px]",
  modal: "p-[20px]",
};

const CommonCard = ({
  children,
  size = "default",
  padding = "default",
  className,
  ...props
}: CommonCardProps) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-md", // 기본 카드 스타일
        sizeMap[size],
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default CommonCard;
