import React from "react";
import { Actions, ActionConst, Scene } from "react-native-router-flux";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Place from "./pages/Place";
import Review from "./pages/Review";
import CheckIns from "./pages/CheckIns";
import UserProfile from "./pages/UserProfile";
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
        <Scene key="about" component={About} initial={false} />
        <Scene key="place" component={Place} initial={false} />
        <Scene key="review" component={Review} initial={false} />
        <Scene key="checkIns" component={CheckIns} initial={false} />
        <Scene key="userProfile" component={UserProfile} initial={false} />
        <Scene
            key="forceUpdate"
            component={ForceUpdate}
            type={ActionConst.RESET}
            initial={false}
        />
    </Scene>,
);

export default Scenes;
