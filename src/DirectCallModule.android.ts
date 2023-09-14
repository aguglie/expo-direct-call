import { PermissionsAndroid } from "react-native";
import { requireNativeModule } from 'expo-modules-core';
import { AndroidPermissionPrompt } from ".";

const nativeModule = requireNativeModule('ExpoDirectCall')

async function requestAndroidPermission(props: { title: string, message: string }): Promise<true> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: props.title,
        message: props.message,
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('Permission denied'));
    }
  } catch (err) {
    console.warn("Unexpected error while requesting permission", err);
    return Promise.reject(err);
  }
}

export async function directCall(phoneNumber: string, androidPermissionPrompt: AndroidPermissionPrompt) {
  await requestAndroidPermission(androidPermissionPrompt);
  nativeModule.directCall(phoneNumber);
}

export function debug() {
  return nativeModule.debug();
}
