import firebase from "react-native-firebase";

import config from "../config";

const response = {
    authenticated: null,
    message: null,
    success: null,
};

export default class UserAuth {
    static getUserAuth() {
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                        userEmail: user._user.email
                            ? user._user.email
                            : user._user.providerData.length &&
                              user._user.providerData[0].email,
                        userName:
                            user._user.providerData.length &&
                            user._user.providerData[0].displayName,
                        userPhotoURL:
                            user._user.providerData.length &&
                            user._user.providerData[0].photoURL,
                        anonymous: user._user.isAnonymous,
                    };
                    resolve(response);
                } else {
                    response.authenticated = false;
                    resolve(response);
                }
            });
        });
    }

    static signInUserAnonymously() {
        return new Promise(resolve => {
            firebase
                .auth()
                .signInAnonymously()
                .then(user => {
                    response.authenticated = true;
                    response.message = {
                        uid: user._user.uid,
                    };
                    resolve(response);
                })
                .catch(error => {
                    response.authenticated = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }

    static signOutUser() {
        return new Promise(resolve => {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    response.success = true;
                    resolve(response);
                })
                .catch(error => {
                    response.success = false;
                    response.message = error;
                    resolve(response);
                });
        });
    }
}
