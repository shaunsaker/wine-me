import { call, put, all, take } from "redux-saga/effects";

import Storage from "../storage";

export function* uploadFile(action) {
    const uploadFileResponse = yield call(Storage.uploadFile, action);

    if (uploadFileResponse) {
        if (uploadFileResponse.success) {
            let nextAction = { ...action.nextAction };
            if (action.nextAction && action.nextAction.useData) {
                nextAction["data"] = uploadFileResponse.message;
            }

            yield put(nextAction);
        } else {
            // We must have an error
            yield put({
                type: "SET_ERROR",
                errorType: "STORAGE",
                message: uploadFileResponse.message,
            });
        }
    }
}
