# Build and Distribute Android Preview APK with Expo/EAS

## Prerequisites
- Node.js 18+ and npm installed.
- Expo CLI/EAS CLI: `npm install -g eas-cli` (or use npx).
- Expo account; log in: `eas login`.
- Android SDK/adb optional (for local install/testing).
- `app.json` and `eas.json` already present (repo includes `preview` profile with `android.buildType: "apk"`).

## 1) Install dependencies
```bash
npm install
```

## 2) Ensure EAS config for APK
`eas.json` already has:
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
This makes the `preview` profile output an APK (device/emulator installable).

## 3) Build the APK (preview)
Using the added npm script:
```bash
npm run build:android:preview
```
Equivalent direct command:
```bash
npx eas build -p android --profile preview
```
What happens:
- Uploads project to Expo servers.
- Produces an APK artifact.
- CLI prints a build URL; open it to download the APK when finished.

Notes:
- First build may prompt for credentials signing setup. Choose Expo-managed or provide your own keystore. Keep the keystore safe; it is required to update the app.
- If behind a proxy/firewall, ensure EAS endpoints are reachable.

## 4) Test the APK locally
- On device: download APK link to phone or `adb install path/to.apk`.
- On emulator: if Android Studio emulator is running, CLI can auto-install; otherwise use `adb install`.

## 5) Prepare for Play Store upload (Internal Testing track recommended)
Google Play prefers AAB for store distribution, but you can upload APK to internal testing. Steps:
1. Create a Play Console project (app listing) and accept required policies.
2. App signing: if you used Expo-managed signing, Play Console will use the uploaded artifact’s signature. If you manage your own keystore, keep the same keystore for future updates.
3. Package name: ensure the Android package (`applicationId`) is set in `app.json` via `android.package` (add if not set) before building for store distribution to keep IDs consistent. For preview APK testing, default is fine, but production should define it.
4. Versioning: bump `version` in `app.json` and `versionCode` in `app.json` → `android.versionCode` for Play updates.

## 6) Upload to Google Play (Internal testing with APK)
1. Build (or rebuild) the APK with the correct package name/version.
2. In Play Console, go to **Internal testing** → **Releases** → **Create new release**.
3. Upload the APK you downloaded from the EAS build page.
4. Add release notes, then save and review.
5. Add internal testers (email list or groups).
6. Roll out the release; testers get a Play link to join and install.

## 7) Recommended: Use AAB for production
For production/store rollout, build an AAB instead of APK:
```bash
npx eas build -p android --profile production
```
Configure `eas.json` `production` profile accordingly (no `buildType: "apk"`). Upload the AAB to Play Console production/closed/open tracks.

## 8) Troubleshooting tips
- Build fails early: run `eas build -p android --profile preview --local` to test locally (requires Android tooling and Java 17).
- Metro/packager issues: clear cache `npm start -- --clear`.
- Keystore issues: `eas credentials` to inspect or rotate; keep backups.
- Slow builds: reuse cache by keeping node_modules or enabling EAS cache (paid feature).

## Quick command summary
- Install: `npm install`
- Build preview APK: `npm run build:android:preview`
- Direct build: `npx eas build -p android --profile preview`
- Check builds: `npx eas build:list`
- Download/install latest on emulator: `npx eas build:run -p android --latest`
