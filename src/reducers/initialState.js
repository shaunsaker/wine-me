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
        temporaryImage: null,
        feedbackPosted: false,
        networkType: null,
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
