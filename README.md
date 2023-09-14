# expo-direct-call

## Overview

The `expo-direct-call` is a React Native Expo library that simplifies the process of placing calls on both Android and iOS platforms. On Android, it allows you to place a direct call without any user prompt by asking for permissions and using the system dialer. On iOS, it shows the user a system prompt to confirm the call.

The library exposes a single `directCall` method, which returns a Promise that resolves when the call action is completed.

## Installation

This package is not published on npm yet, so you'll need to install it directly from GitHub:

```bash
npm install https://github.com/aguglie/expo-direct-call
```

## Usage

First, import the package in your React Native project.

```javascript
import * as ExpoDirectCall from 'expo-direct-call';
```

Then, you can use the `directCall` method to initiate a call:

```javascript
<Button
  onPress={() => ExpoDirectCall.directCall("123456789", {
    title: "Place call permission",
    message: "We need your permission to place direct calls"
  })}
  title="Call 123456789"
/>
```

### API

#### `directCall(phoneNumber: string, prompt: AndroidPermissionPrompt): Promise<void>`

| Parameter                | Type                    | Description                                       |
|--------------------------|-------------------------|---------------------------------------------------|
| `phoneNumber`            | `string`                | The phone number to call.                         |
| `prompt`| `AndroidPermissionPrompt`| An object with the `title` and `message` for the Android permission prompt.|

## Example App

The library includes an example folder with a sample app to demonstrate the usage of `expo-direct-call`.

## License

MIT License
