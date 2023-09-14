import { AndroidPermissionPrompt } from "./index";

export function directCall(
  phoneNumber: string,
  androidPermissionPrompt: AndroidPermissionPrompt,
): Promise<void>;

export function debug(): Promise<void>;
