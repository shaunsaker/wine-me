import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import ForceUpdate from "./pages/ForceUpdate";

const Scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene
            key="home"
            component={Home}
            type={ActionConst.REPLACE}
            initial={true}
        />
        <Scene key="search" component={Search} initial={false} />
        <Scene
            key="forceUpdate"
            component={ForceUpdate}
            type={ActionConst.RESET}
            initial={false}
        />
    </Scene>,
);

export default Scenes;
