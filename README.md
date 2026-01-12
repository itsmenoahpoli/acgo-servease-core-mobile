# Servease Platform - Consumer App

Servease is a modern service platform connecting consumers with service providers. This is the consumer-facing mobile application built with React Native and Expo.

## 🚀 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🛠 Setup and Installation

### Prerequisites

- **Node.js**: LTS version (v18 or higher recommended)
- **Package Manager**: npm (included with Node)
- **Expo Go App**: Download on your [iOS](https://apps.apple.com/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device to preview.
- **EAS CLI**: For building APKs/AABs (`npm install -g eas-cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servease-consumer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 📱 Local Development

### Running the App

Start the Expo development server:

```bash
npm start
```

Once the server is running, you can open the app on:

- **Android Emulator**: Press `a` in the terminal (requires Android Studio / Emulator set up).
- **iOS Simulator**: Press `i` in the terminal (requires macOS and Xcode set up).
- **Physical Device**: Scan the QR code using the **Expo Go** app on Android or the **Camera** app on iOS.

### Common Scripts

- `npm run android`: Starts expo and attempts to open on an Android device/emulator.
- `npm run ios`: Starts expo and attempts to open on an iOS device/simulator.
- `npm run lint`: Checks for code style and linting issues.
- `npm run format`: Automatically fixes formatting issues.

## 📦 Building and Deployment

For detailed instructions on how to build a preview APK and upload the app to the Google Play Store, please refer to our dedicated guide:

👉 **[Expo Build & Play Store Guide](./EXPO_BUILD_GUIDE.md)**

---

## 🏗 Project Structure

- `app/`: Expo Router file-based navigation.
- `components/`: Reusable UI components (layouts, modules, shared).
- `constants/`: App-wide constants and theme settings.
- `hooks/`: Custom React hooks.
- `services/`: API and external service logic.
- `store/`: Zustand state management stores.
- `assets/`: Images, fonts, and other static assets.
- `utils/`: Helper functions and utilities.
