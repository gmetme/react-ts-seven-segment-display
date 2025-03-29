"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SevenSegmentDisplay = function (_a) {
    var _b = _a.value, value = _b === void 0 ? null : _b, _c = _a.height, height = _c === void 0 ? 64 : _c, _d = _a.segmentSize, segmentSize = _d === void 0 ? 8 : _d, _e = _a.bgColor, bgColor = _e === void 0 ? "#F2F2F2" : _e, _f = _a.color, color = _f === void 0 ? "#545C6C" : _f, _g = _a.spacing, spacing = _g === void 0 ? 8 : _g, startFromEnd = _a.startFromEnd, autoGrow = _a.autoGrow;
    segmentSize = autoGrow && value !== null && value.toString().length > segmentSize ? value.toString().length : segmentSize;
    var digits = {
        "-": [bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, color],
        "null": [bgColor, bgColor, bgColor, bgColor, bgColor, bgColor, bgColor],
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
    };
    var digitPositions = [
        'M49 0H15L8 7L15 14H49L56 7L49 0Z',
        'M64 51L64 15L57 8L50 15L50 44L57 51L64 51Z',
        'M64 53L64 89L57 96L50 89L50 60L57 53L64 53Z',
        'M49 90H15L8 97L15 104H49L56 97L49 90Z',
        'M1.87959e-06 53L3.0598e-07 89L7 96L14 89L14 60L7 53L1.87959e-06 53Z',
        'M1.87959e-06 51L3.0598e-07 15L7 8L14 15L14 44L7 51L1.87959e-06 51Z',
        'M49 45H15L8 52L15 59H49L56 52L49 45Z'
    ];
    var segments = (0, react_1.useMemo)(function () {
        return Array.from({ length: segmentSize }, function (_, i) {
            if (value === null)
                return digits["null"];
            var valueString = value.toString();
            var startFromIndex = i < valueString.length ? i : null;
            var isNegative = valueString.charAt(0) === "-" && i === 0;
            if (startFromEnd) {
                startFromIndex = i < (segmentSize - valueString.length) ? null : i;
                isNegative = isNegative && startFromIndex === (segmentSize - valueString.length);
            }
            if (startFromIndex !== null) {
                var digitIndex = startFromEnd ? startFromIndex - (segmentSize - valueString.length) : i;
                if (isNegative)
                    return digits["-"];
                return digits[valueString.charAt(digitIndex)];
            }
            return digits["null"];
        });
    }, [value]);
    return (react_1.default.createElement("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "".concat(spacing, "px"),
        } }, segments.map(function (segment, index) {
        return (react_1.default.createElement("svg", { key: "segment-".concat(index), height: height, viewBox: "0 0 64 104", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, digitPositions.map(function (digitPosition, digitIndex) {
            return (react_1.default.createElement("path", { key: "segment-digit-".concat(digitIndex), d: digitPosition, fill: segment[digitIndex] }));
        })));
    })));
};
exports.default = SevenSegmentDisplay;
//# sourceMappingURL=SevenSegmentDisplay.js.map