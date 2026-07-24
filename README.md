# SmartLife — Ionic + Angular Hybrid Mobile App

A fully working Ionic 8 + Angular 18 (standalone components) + Capacitor 6 hybrid
mobile app, built to match the SmartLife smart-home UI design (Login, Dashboard,
Room detail, Devices, Device detail, Statistics).

## Screens included

| Screen | Path |
|---|---|
| Login | `src/app/pages/login` |
| Tabs shell (bottom nav) | `src/app/pages/tabs` |
| Dashboard | `src/app/pages/dashboard` |
| Room detail | `src/app/pages/room-detail` |
| Devices list | `src/app/pages/devices` |
| Device detail | `src/app/pages/device-detail` |
| Statistics | `src/app/pages/statistics` |
| Settings | `src/app/pages/settings` |

All charts (area/line usage & expense charts, donut "shares" chart, bar usage
chart, circular "today" gauge) are built as **reusable standalone SVG
components** in `src/app/shared/components` — no external chart library
required, so the app stays small and fast on-device.

Mock smart-home data (rooms, devices, usage numbers) lives in one place:
`src/app/core/smart-home.service.ts`. Swap this out for real HTTP/API calls
whenever you're ready to connect a backend — every page already reads from
this service via Angular signals, so the UI updates automatically.

## Requirements

- Node.js 18+ and npm
- Ionic CLI: `npm install -g @ionic/cli`
- For native builds: Xcode (iOS) and/or Android Studio (Android)

## 1. Install dependencies

```bash
npm install
```

## 2. Run in the browser (fastest way to preview)

```bash
ionic serve
```

This opens the app at `http://localhost:8100`. Use Chrome DevTools' device
toolbar (iPhone size) for the best preview, since the layouts are designed
mobile-first.

## 3. Build the web assets

```bash
ionic build
```

Output goes to the `www/` folder.

## 4. Add native platforms (Capacitor)

```bash
npx cap add ios
npx cap add android
```

## 5. Sync web build into native projects

Anytime you change code, rebuild and sync:

```bash
npm run cap:sync
```

## 6. Open in native IDEs to run on device/emulator

```bash
npx cap open ios       # opens Xcode
npx cap open android   # opens Android Studio
```

From there, hit Run in Xcode/Android Studio to install on a simulator,
emulator, or a physical device.

## Project structure

```
src/
  app/
    core/                     # models + SmartHomeService (mock data layer)
    shared/components/        # area-chart, donut-chart, bar-chart (SVG)
    pages/
      login/
      tabs/                   # bottom tab bar shell + child routes
      dashboard/
      room-detail/
      devices/
      device-detail/
      statistics/
      settings/
    app.component.ts
    app.routes.ts
  theme/variables.scss         # brand colors (navy / amber / indigo)
  global.scss                  # shared utility classes (.sl-card, etc.)
  assets/
capacitor.config.ts
angular.json
package.json
```

## Customizing the theme

All brand colors live in `src/theme/variables.scss` as CSS custom properties
(`--ion-color-primary`, `--sl-accent-yellow`, `--sl-accent-indigo`, etc.).
Change them there and the whole app updates — no need to touch component
files.

## Notes

- Routing uses Angular's standalone `loadComponent` lazy loading, so each
  screen is a separate JS chunk — good for startup performance.
- Navigation flow: Login → Tabs (Dashboard/Devices/Statistics/Settings).
  Dashboard room cards and the Devices list both push into shared
  Room Detail / Device Detail pages via route params (`/room/:id`,
  `/device/:id`).
- Device toggles and the brightness slider on the Device Detail page write
  back into `SmartHomeService`'s signal-based state, so switching a device
  on Dashboard → Room → Device stays in sync.
- `favicon.png` is a placeholder — replace `src/assets/icon/favicon.png` and
  `src/assets/img/avatar.svg` with your real brand assets before shipping.
