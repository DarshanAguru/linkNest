# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.0] - 2026-02-18

### Added
-   **New "Tiny" App Icon**: Refined app icon (128x128) with significant whitespace padding for a cleaner look on modern launchers.
-   **About Page Redesign**: Complete overhaul of the About section (`about.tsx`) to match the card-based, dark aesthetic of the Help section.
-   **Help Page Enhancements**: Added "Data Storage" disclaimer to clarify local-only storage.
-   **UI Improvements**: Added tile-like shadows to all `TextInput` fields and action buttons for better depth perception.

### Changed
-   **Navigation**: Replaced internal `routeToScreen` with standard `useRouter` hook in `help.tsx` to fix TypeScript errors.
-   **SearchBox UI**: Fixed layout issues (removed `flex: 1`) and updated border radius to 12px.
-   **About Page**: Updated content to specific "Darshan Aguru" profile with active social links (GitHub, LinkedIn, Instagram).

### Fixed
-   **Flickering Shadows**: Refactored `TextInput` components to wrap them in `View` containers, resolving shadow flickering on Android during typing.
-   **JSX Syntax Errors**: Fixed malformed JSX tags in `addLink.tsx` and `edit/[id].tsx` that caused build failures.

## [0.9.0] - 2026-02-17

### Added
-   Initial release features.
-   Link saving with tags and descriptions.
-   SQLite local database integration.
-   Gesture handling (Tap, Double Tap, Long Press, Swipe).
