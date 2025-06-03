declare module "react-mobile-picker-scroll" {
  import React from "react";

  interface PickerProps {
    optionGroups: {
      [key: string]: string[];
    };
    valueGroups: {
      [key: string]: string;
    };
    onChange: (name: string, value: string) => void;
    height?: number;
    itemHeight?: number;
    wheelWrapperStyle?: React.CSSProperties;
    itemStyle?: React.CSSProperties;
    indicatorStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
  }

  const Picker: React.FC<PickerProps>;

  export default Picker;
}
