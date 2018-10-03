import { takeLatest, takeEvery, fork, all } from 'redux-saga/effects';

import {
  getAuth,
  signInAnonymously,
  getCredentialFromFacebook,
  getCredentialAndSignIn,
  signInWithCredential,
  signOut,
} from './auth';

import { logError } from './errors';

import {
  addDocument,
  deleteDocument,
  disableNetwork,
  enableNetwork,
  getCollection,
  getDocument,
  setDocument,
  sync,
  updateDocument,
} from './firestore';

import { getDeviceLocation, getFormattedAddressFromCoords } from './location';

import { checkPermission, requestPermission, checkAndRequestPermission } from './permissions';

export default function* sagas() {
  yield all([
    fork(takeLatest, 'getAuth', getAuth),
    fork(takeLatest, 'signInAnonymously', signInAnonymously),
    fork(takeLatest, 'getCredentialFromFacebook', getCredentialFromFacebook),
    fork(takeLatest, 'getCredentialAndSignIn', getCredentialAndSignIn),
    fork(takeLatest, 'signInWithCredential', signInWithCredential),
    fork(takeLatest, 'signOut', signOut),

    fork(takeEvery, 'addDocument', addDocument),
    fork(takeEvery, 'deleteDocument', deleteDocument),
    fork(takeEvery, 'disableNetwork', disableNetwork),
    fork(takeEvery, 'enableNetwork', enableNetwork),
    fork(takeEvery, 'getCollection', getCollection),
    fork(takeEvery, 'getDocument', getDocument),
    fork(takeEvery, 'setDocument', setDocument),
    fork(takeEvery, 'sync', sync),
    fork(takeEvery, 'updateDocument', updateDocument),

    fork(takeLatest, 'logError', logError),

    fork(takeLatest, 'getDeviceLocation', getDeviceLocation),
    fork(takeLatest, 'getFormattedAddressFromCoords', getFormattedAddressFromCoords),

    fork(takeLatest, 'checkPermission', checkPermission),
    fork(takeLatest, 'requestPermission', requestPermission),
    fork(takeLatest, 'checkAndRequestPermission', checkAndRequestPermission),
  ]);
}
