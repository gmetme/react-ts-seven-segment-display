import React from "react";
declare const SevenSegmentDisplay: ({ value, height, segmentSize, bgColor, color, spacing, startFromEnd, autoGrow, }: {
    value?: number | null;
    height?: number;
    segmentSize?: number;
    bgColor?: string;
    color?: string;
    spacing?: number;
    startFromEnd?: boolean;
    autoGrow?: boolean;
}) => React.JSX.Element;
export default SevenSegmentDisplay;
