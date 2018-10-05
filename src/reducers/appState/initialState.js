const initialState = {
  deviceLocation: {
    lat: null,
    lng: null,
  },
  systemMessage: null,
  network: {
    type: null,
    effectiveType: null,
  },
  pendingTransactions: [],
  codePushStatus: null,
  codePushDownloadProgress: null,
};

export default initialState;
