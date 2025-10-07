import React, { useMemo } from "react";

const SevenSegmentDisplay = (
  {
    value = null,
    height = 64,
    segmentSize = 8,
    bgColor = "#F2F2F2",
    color = "#545C6C",
    spacing = 8,
    startFromEnd,
    autoGrow,
    leftPadChar = null,
    className = ""
  }: {
    value?: number | string | null,
    height?: number,
    segmentSize?: number,
    bgColor?: string,
    color?: string
    spacing?: number,
    startFromEnd?: boolean,
    autoGrow?: boolean,
    leftPadChar?: string | null,
    className?: string | null
  }
) => {
  segmentSize = autoGrow && value !== null && value.toString().length > segmentSize ? value.toString().length : segmentSize

  const digits = {
    "null": [bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, bgColor],
    " ": [bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, bgColor],
    "-": [bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, color],
    "_": [bgColor, bgColor, bgColor, color, bgColor, bgColor, bgColor],
    "=": [bgColor, bgColor, bgColor, color, bgColor, bgColor, color],
    "[": [color, bgColor, bgColor, color, color, color, bgColor],
    "]": [color, color, color, color, bgColor, bgColor, bgColor],
    "0": [color, color, color, color, color, color, bgColor],
    "1": [bgColor, color, color, bgColor, bgColor, bgColor, bgColor],
    "2": [color, color, bgColor, color, color, bgColor, color],
    "3": [color, color, color, color, bgColor, bgColor, color],
    "4": [bgColor, color, color, bgColor, bgColor, color, color],
    "5": [color, bgColor, color, color, bgColor, color, color],
    "6": [color, bgColor, color, color, color, color, color],
    "7": [color, color, color, bgColor, bgColor, bgColor, bgColor],
    "8": [color, color, color, color, color, color, color],
    "9": [color, color, color, color, bgColor, color, color],

    "A": [color, color, color, bgColor, color, color, color],
    "B": [bgColor, bgColor, color, color, color, color, color],
    "C": [color, bgColor, bgColor, color, color, color, bgColor],
    "D": [bgColor, color, color, color, color, bgColor, color],
    "E": [color, bgColor, bgColor, color, color, color, color],
    "F": [color, bgColor, bgColor, bgColor, color, color, color],
    "G": [color, bgColor, color, color, color, color, bgColor],
    "H": [bgColor, bgColor, color, bgColor, color, color, color],
    "I": [bgColor, bgColor, bgColor, bgColor, color, color, bgColor],
    "J": [bgColor, color, color, color, color, bgColor, bgColor],
    "K": [color, bgColor, color, bgColor, color, color, color],
    "L": [bgColor, bgColor, bgColor, color, color, color, bgColor],
    "M": [color, bgColor, color, bgColor, color, bgColor, bgColor],
    "N": [color, color, color, bgColor, color, color, bgColor],
    "O": [color, color, color, color, color, color, bgColor],
    "P": [color, color, bgColor, bgColor, color, color, color],
    "Q": [color, color, color, bgColor, bgColor, color, color],
    "R": [color, color, bgColor, bgColor, color, color, bgColor],
    "S": [color, bgColor, color, color, bgColor, color, color],
    "T": [bgColor, bgColor, bgColor, color, color, color, color],
    "U": [bgColor, color, color, color, color, color, bgColor],
    "V": [bgColor, color, color, color, bgColor, color, bgColor],
    "W": [bgColor, color, bgColor, color, bgColor, color, bgColor],
    "X": [bgColor, color, color, bgColor, color, color, color],
    "Y": [bgColor, color, color, color, bgColor, color, color],
    "Z": [color, color, bgColor, color, bgColor, bgColor, color]
  }

  const digitPositions = [
    'M49 0H15L8 7L15 14H49L56 7L49 0Z',
    'M64 51L64 15L57 8L50 15L50 44L57 51L64 51Z',
    'M64 53L64 89L57 96L50 89L50 60L57 53L64 53Z',
    'M49 90H15L8 97L15 104H49L56 97L49 90Z',
    'M1.87959e-06 53L3.0598e-07 89L7 96L14 89L14 60L7 53L1.87959e-06 53Z',
    'M1.87959e-06 51L3.0598e-07 15L7 8L14 15L14 44L7 51L1.87959e-06 51Z',
    'M49 45H15L8 52L15 59H49L56 52L49 45Z'
  ]

  const segments = useMemo(() => {
    return Array.from({ length: segmentSize }, (_, i) => {
      if (value === null) return digits["null"]
      var valueString = value.toString().toUpperCase()
      if (value !== null && leftPadChar !== null) {
        valueString = valueString.padStart(3, leftPadChar);
      }

      let startFromIndex = i < valueString.length ? i : null
      let isNegative = valueString.charAt(0) === "-" && i === 0

      if (startFromEnd) {
        startFromIndex = i < (segmentSize - valueString.length) ? null : i
        isNegative = isNegative && startFromIndex === (segmentSize - valueString.length)
      }

      if (startFromIndex !== null) {
        let digitIndex = startFromEnd ? startFromIndex - (segmentSize - valueString.length) : i

        if (isNegative) return digits["-"]

        const digit = valueString.charAt(digitIndex)

        if (digit in digits) return digits[digit as keyof typeof digits]

        return digits["null"]
      }
      return digits["null"]
    })
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: `${spacing}px`,
      }}
    >
      {
        segments.map((segment, index) => {
          return (
            <svg
              className={`seven-segment-display ${className ?? ""}`}
              key={`segment-${index}`}
              height={height}
              viewBox="0 0 64 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {
                digitPositions.map((digitPosition, digitIndex) => {
                  return (
                    <path
                      key={`segment-digit-${digitIndex}`}
                      d={digitPosition}
                      fill={segment[digitIndex]}
                    />
                  )
                })
              }
            </svg>
          )
        })
      }
    </div>
  );
}

export default SevenSegmentDisplay;
