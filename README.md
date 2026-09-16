# Muslim Zone

**Muslim Zone** is an open-source Islamic application for mobile and desktop, designed to help Muslims keep track of prayer times and access Du’as for everyday life.

Built with React Native, React, Tauri, TypeScript, and a shared monorepo architecture.

## 📱 Platforms

| Platform | Status         |
| -------- | -------------- |
| Android  | ✅ Available   |
| iOS      | 🚧 Coming Soon |
| macOS    | ✅ Available   |
| Windows  | ✅ Available   |

## ✨ Features

- 🕌 Prayer times
- 📍 Automatic and manual location
- ⏱️ Prayer countdown
- 🔔 Prayer notification
- 📅 Prayer schedules
- 🤲 Duas
- 🔎 Dua search
- 📖 Arabic, transliteration, and translations
- ⭐ Favorite/bookmarked Duas
- 🌙 Hijri date

## 🛠️ Tech Stack

- **Mobile:** React Native + Expo
- **Desktop:** React + Tauri
- **Styling:** Tailwind CSS
- **Data & State:** TanStack Query
- **Monorepo:** pnpm + Turborepo
- **CI/CD:** GitHub Actions
- **Releases:** GitHub Releases

## 📦 Project Structure

```text
muslim-zone/
├── apps/
│   ├── mobile/                 # Expo React Native
│   └── desktop/                # React + Tauri
│
├── packages/
│   ├── core/                   # Shared application logic and data
│   ├── react/                  # Shared React functionality
│   └── ui/                     # Shared UI components
│
├── .github/
│   └── workflows/              # GitHub Actions
│
├── LICENSE
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🚀 Getting Started

### Requirements

- Node.js 22+
- pnpm
- Git
- Rust
- Tauri prerequisites for your operating system
- Android Studio for Android development

### Install

```bash
git clone https://github.com/sshatil/muslim-zone.git
cd muslim-zone
pnpm install
```

### Development

Run the project:

```bash
pnpm dev
```

Run the mobile application:

```bash
pnpm dev:mobile
```

Run the desktop application:

```bash
pnpm dev:desktop
```

### Checks

```bash
pnpm typecheck
pnpm lint
```

### Desktop Build

```bash
pnpm build:desktop
```

## 🤝 Contributing

Contributions are welcome!

You can contribute to:

- Mobile
- Desktop
- Shared packages
- UI/UX
- Islamic content
- Translations
- Documentation
- Bug fixes
- New features

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

## 🐛 Issues

Found a bug or have an idea?

- [Report a bug](https://github.com/sshatil/muslim-zone/issues/new)
- [Request a feature](https://github.com/sshatil/muslim-zone/issues/new)

Please search existing issues before creating a new one.

## 🚀 Releases

### 📱 Android App — Help Us Test

The Android app is currently undergoing Google Play testing and requires 12 testers to remain opted in continuously for at least 14 days to complete the verification requirement.

Help us reach the requirement by joining the testing program:

👉 Join the Google Play Testing Program

- [Join on Android](https://play.google.com/store/apps/details?id=com.shatil.muslimzone)
- [Join on the web](https://play.google.com/apps/testing/com.shatil.muslimzone)

Your participation will help us complete the requirement and move the Android app closer to its public release.

### Desktop App

Desktop releases are built automatically through GitHub Actions.

Current desktop targets:

- macOS Apple Silicon
- Windows

Releases are published through GitHub Releases.

## 🗺️ Roadmap

### 📱 Platform Support

- [x] Android
- [x] macOS
- [x] Windows
- [ ] iOS

### 🚀 Testing & Publishing

- [ ] Complete Google Play testing requirement
- [ ] Publish Android app on Google Play
- [ ] Publish iOS app on the App Store

### ✨ Features & Improvements

- [ ] More Islamic features
- [ ] More languages
- [ ] Additional improvements based on community feedback

## 📄 License

Muslim Zone is licensed under the [MIT License](LICENSE).

---

Made with ❤️ for the Muslim community.
