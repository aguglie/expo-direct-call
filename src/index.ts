import * as DirectCallModule from './DirectCallModule';

export type AndroidPermissionPrompt = {
    title: string,
    message: string,
}

export function directCall(phoneNumber: string, androidPermissionPrompt: AndroidPermissionPrompt): Promise<void> {
    return DirectCallModule.directCall(phoneNumber, androidPermissionPrompt);
}

export function debug() {
    return DirectCallModule.debug();
}