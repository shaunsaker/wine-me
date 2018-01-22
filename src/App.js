import React from "react";
import { Router } from "react-native-router-flux";
import { Provider, connect } from "react-redux";

import { store } from "./store";
import Scenes from "./routes";

// Connect router to store
const ConnectedRouter = connect()(Router);

// Wrappers
import AuthHandler from "./wrappers/AuthHandler";
import DataHandler from "./wrappers/DataHandler";
import NetworkHandler from "./wrappers/NetworkHandler";
import GeolocationHandler from "./wrappers/GeolocationHandler";
import SnackBarHandler from "./wrappers/SnackBarHandler";
import PlaceActionSheetHandler from "./wrappers/PlaceActionSheetHandler";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AuthHandler>
                    <DataHandler>
                        <NetworkHandler>
                            <GeolocationHandler>
                                <SnackBarHandler>
                                    <PlaceActionSheetHandler>
                                        <ConnectedRouter scenes={Scenes} />
                                    </PlaceActionSheetHandler>
                                </SnackBarHandler>
                            </GeolocationHandler>
                        </NetworkHandler>
                    </DataHandler>
                </AuthHandler>
            </Provider>
        );
    }
}
