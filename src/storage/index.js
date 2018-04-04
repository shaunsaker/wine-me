import firebase from "react-native-firebase";

const response = {
    success: null,
    error: null,
    message: null,
};

export default class Storage {
    static uploadFile(action) {
        if (__DEV__) {
            console.log("Uploading file", action);
        }

        return new Promise(resolve => {
            firebase
                .storage()
                .ref(action.node)
                .putFile(action.path)
                .on(
                    "state_changed",
                    snapshot => {
                        // Current upload state
                        // Ignore for now (need eventChannel)
                        if (__DEV__) {
                            console.log(snapshot);
                        }
                    },
                    error => {
                        //Error
                        if (__DEV__) {
                            console.log(error);
                        }
                        response.error = true;
                        response.message = error.message; // TODO: test this
                        resolve(response);
                    },
                    uploadedFile => {
                        if (__DEV__) {
                            console.log("Success");
                        }
                        //Success
                        response.success = true;
                        response.message = uploadedFile.downloadURL;
                        resolve(response);
                    },
                );
        });
    }
}
