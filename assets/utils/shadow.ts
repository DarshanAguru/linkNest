import { ViewStyle, Platform } from "react-native";

export const getShadow = (
    color: string = "#000",
    opacity: number = 0.2,
    radius: number = 4,
    elevation: number = 5,
    offset: { width: number; height: number } = { width: 0, height: 2 }
): any => {
    if (Platform.OS === "android") {
        return {
            elevation: elevation,
            shadowColor: color,
        };
    } else {
        return {
            shadowColor: color,
            shadowOffset: offset,
            shadowOpacity: opacity,
            shadowRadius: radius,
        };
    }
};
