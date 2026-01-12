# Expo Android Build & Play Store Upload Guide

## Prerequisites
1) Node.js and npm installed.
2) Expo CLI dependencies installed in the project (`npm install`).
3) EAS CLI installed globally or via npx: `npm install -g eas-cli` (or use `npx eas-cli ...`).
4) Expo account ready; login with `eas login`.
5) Android SDK/adb optional for local installs, but not required for cloud builds.

## Project scripts and config
- Preview APK build script (already in `package.json`): `npm run build:android:preview` → runs `eas build -p android --profile preview`.
- Build profile in `eas.json` (already present):
  ```json
  {
    "build": {
      "preview": {
        "android": {
          "buildType": "apk"
        }
      },
      "production": {}
    }
  }
  ```
  - `preview` → generates an APK for direct install/testing.
  - `production` → default AAB (App Bundle) suitable for Play Store upload.

## Build a preview APK (device/emulator install)
1) Install deps: `npm install`
2) Login: `eas login`
3) Run the preview build: `npm run build:android:preview`
4) Wait for the EAS URL when the build finishes; open it in a browser.
5) Download the APK from the build page.
6) Install:
   - Emulator: `eas build:run -p android --latest` (auto-download+install), or drag-drop the APK into the emulator.
   - Physical device: enable “Install unknown apps,” transfer the APK (link, AirDrop, email), then install; or use `adb install path/to.apk`.

## Build a production bundle for Play Store (AAB)
1) Ensure `eas.json` has a production profile (default is fine). If you want explicit, add:
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     }
   }
   ```
   - Default `production` buildType is `app-bundle`, so this is optional.
2) Run: `npx eas-cli build -p android --profile production`
3) When the build finishes, open the provided URL and download the `.aab`.
4) (Optional) Verify signing: EAS manages signing by default. To reuse a keystore, set it up via `eas credentials`.

## Upload to Google Play (internal testing or production)
1) Go to Google Play Console → Create app (if new) → fill required details (app name, default language, app category, content rating, privacy policy).
2) Navigate to “Production” (or “Internal testing” for safer rollout) → “Create new release.”
3) Upload the `.aab` from the EAS production build.
4) Add release notes, save, and review.
5) For internal testing: create a testing track, add testers (email list or Play groups), and roll out.
6) For production: complete all store listing assets and mandatory questionnaires (Data safety, Ads declaration, Content rating), then submit for review.

## Tips and troubleshooting
- If the build fails early, ensure `eas-cli` is logged in and your Expo account has access to the project.
- Clean caches if metro/build issues occur: `expo start -c`.
- For Play uploads, Google requires AAB (not APK) for releases. Use the `production` profile.
- For faster iteration on devices, use the `preview` APK profile and install directly without Play Console.

