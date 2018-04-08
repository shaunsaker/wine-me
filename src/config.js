const config = {};

config.version = {
    app: {
        major: 1,
        minor: 1,
        patch: 0,
    },
    build: 6,
};

config.googlePlacesAPIKey = "AIzaSyBPNFv3FSsCkPppNLdgHuYDV4eENMXP6Tw";
config.imagesMaxHeight = 400;

config.corks = {
    visited: 5,
};

config.resizedImages = {
    maxWidth: 500, // TODO: need to play with these values
    maxHeight: 500,
    format: "PNG", // android only
    quality: 100,
};

config.development = true;

config.environment = __DEV__ || config.development ? "development" : "staging";

export default config;
