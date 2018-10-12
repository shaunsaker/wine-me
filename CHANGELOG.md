# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.3.0-10-7

### Added

- Added StatusBar component
- Added styles for iPhoneX

### Changed

- Updated profile page blank state copy
- Changed the styling of the "Opening Hours" section on the place page
- Updated RNSC borrowed components testing patterns
- Updated RemoteImage component method names

## 1.2.0-9-6

### Fixed

- Fixed Search no results blank state not displaying
- Fixed text alignment of CodePushStatus in InfoModal
- Fixed RemoteImage no border radius

### Added

- Added getPercentage util to numbers subset
- Added CodePushStatus container tests
- Added checked in icon to Place cards
- Added noFeedback prop to Touchable component

### Changed

- CodePushStatus uses getPercentage util
- Disabled feedback on PlaceCards
- LocationHandler gets location additionally on appState change
- Images (PlaceCard and Place photos) are based on device pixel ratio
- Renamed PhotoList => ThumbnailList
- Separated Thumbnail component out of ThumbnailList
- Image (PlaceCard and Thumbnail) heights come from styleConstants

## 1.2.0-9-4

### Fixed

- Fixed CodePushStatus text alignment
- Fixed Lightbox border radius on Android

### Added

- Added date to check in data log

## 1.2.0-9-3

### Fixed

- Fixed CodePush long text alignment
- Fixed CodePushHandler appState bug

### Added

- Added date_created to check in data log
- Added AndroidBackHandler

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
