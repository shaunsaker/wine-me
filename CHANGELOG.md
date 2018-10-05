# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.2.0-9-3

### Fixed

- Fixed CodePush long text alignment
- Fixed CodePushHandler appState bug

### Added

- Added date_created to check in data log

### Changed

- Changed back android behaviour in Lightbox component
- Changed store action log to only log if iOS

### Removed

- Removed Slack post from logError saga

## 1.2.0-9-2

### Added

- Added InfoModal with app version info and CodePush status

### Fixed

- Fixed incorrect CodePush handling

## 1.1.0

This was in fact a complete app rewrite masquerading as a minor version bump due to most functionality still being in place.

### Fixed

- Fixed "Close to me" places sorting

### Changed

- Changed fonts to Nunito
- Changed app colors to Purple, Blue and Red

### Added

- Added offline persistence
- Added cacheable images
- Added profile page with "My Places"
- Added unit tests
- Added codePush

### Removed

- Removed social authentication
- Removed "My Places" tab on Home page
- Removed Side menu
- Removed Leaderboard page
- Removed About page
