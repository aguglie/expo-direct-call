import { AppState, Linking } from "react-native";


function awaitForForeground() {
    return new Promise((resolve) => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'active') {
                subscription.remove();
                resolve(true);
            }
        });
    });
}

export async function directCall(phoneNumber: string) {
    {
        const url = `tel:${encodeURIComponent(phoneNumber)}`;

        const canOpenURL = await Linking.canOpenURL(url);
        if (!canOpenURL) {
            throw new Error(`URL scheme is not supported`);
        }

        await Promise.all([
            Linking.openURL(url),
            awaitForForeground(),
        ])
    }
}

export function debug() {
    return "No debug on iOS";
}