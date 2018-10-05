import { all, put } from 'redux-saga/effects';

import utils from '../../../utils';

export default function* logError(action) {
  /*
      This should
        - If in production:
          - Log the error to the db
          - SET_SYSTEM_MESSAGE
        - If in development
          - SET_SYSTEM_MESSAGE
  */

  try {
    const data = {
      ...action.payload.error,
      uid: action.payload.uid,
      date: action.payload.date,
      action: action.payload.action,
    };

    const actions = [
      put({
        type: 'SET_SYSTEM_MESSAGE',
        payload: {
          message: action.payload.error.message,
        },
      }),
    ];

    const databaseAction = put({
      type: 'pushData',
      payload: {
        data,
        ref: 'errors',
      },
    });

    if (!__DEV__) {
      actions.push(databaseAction);
    }

    yield all(actions);
  } catch (error) {
    yield put({
      type: 'SET_SYSTEM_MESSAGE',
      payload: utils.app.createError(error),
      error: true,
    });
  }
}
