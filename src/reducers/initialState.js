const initialState = {
    userAuth: {
        authenticated: null,
        uid: null,
        anonymous: null,
        userPassword: null,
    },
    appState: {
        loading: true,
        error: {
            errorType: null,
            message: null,
            duration: null,
        },
        userLocation: null,
        networkType: null,
        isOnline: true, // assume it's true
        showSideMenu: false,
    },
    appData: {
        app: null,
        users: null,
        appVersion: null,
    },
    userData: {
        settings: null,
        profile: {
            userName: null,
            userEmail: null,
            userLocation: null,
            userPhotoURL: null,
        },
    },
};

export default initialState;
