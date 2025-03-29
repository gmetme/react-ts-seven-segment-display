import React, {useMemo} from "react";

const SevenSegmentDisplay = (
  {
    value= null,
    height= 64,
    segmentSize= 8,
    bgColor= "#F2F2F2",
    color= "#545C6C",
    spacing= 8,
    startFromEnd,
    autoGrow,
  } :{
    value?: number | null,
    height?: number,
    segmentSize?: number,
    bgColor?: string,
    color?: string
    spacing?: number,
    startFromEnd?: boolean,
    autoGrow?: boolean,
  }
) => {
  segmentSize = autoGrow && value!==null && value.toString().length > segmentSize ? value.toString().length : segmentSize

  const digits = {
    "-": [ bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, color ],
    "null": [ bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, bgColor ],
    "0": [ color, color, color, color, color, color, bgColor ],
    "1": [ bgColor, color, color, bgColor, bgColor, bgColor, bgColor ],
    "2": [ color, color, bgColor, color, color, bgColor, color ],
    "3": [ color, color, color, color, bgColor, bgColor, color ],
    "4": [ bgColor, color, color, bgColor, bgColor, color, color ],
    "5": [ color, bgColor, color, color, bgColor, color, color ],
    "6": [ color, bgColor, color, color, color, color, color ],
    "7": [ color, color, color, bgColor, bgColor, bgColor, bgColor ],
    "8": [ color, color, color, color, color, color, color ],
    "9": [ color, color, color, color, bgColor, color, color ],
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
      const valueString = value.toString()

      let startFromIndex= i < valueString.length ? i : null
      let isNegative = valueString.charAt(0) === "-" && i === 0

      if (startFromEnd) {
        startFromIndex = i < (segmentSize - valueString.length)? null : i
        isNegative= isNegative && startFromIndex === (segmentSize - valueString.length)
      }

      if (startFromIndex!== null) {
        let digitIndex= startFromEnd? startFromIndex - (segmentSize - valueString.length) : i

        if (isNegative) return digits["-"]

        return digits[valueString.charAt(digitIndex) as keyof typeof digits]
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
        segments.map((segment, index)=> {
          return (
            <svg
              key={`segment-${index}`}
              height={height}
              viewBox="0 0 64 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {
                digitPositions.map((digitPosition,digitIndex) => {
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
