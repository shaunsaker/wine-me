import React from 'react';
import { Actions, Scene, Tabs, Lightbox } from 'react-native-router-flux';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';

const scenes = Actions.create(
  <Lightbox>
    <Scene key="root" hideNavBar>
      {/* <Tabs key="tabs" hideTabBar animationEnabled={false} initial={false}> */}
      <Scene key="home" component={Home} hideNavBar />
      <Scene key="profile" component={Profile} hideNavBar initial={false} />
      {/* </Tabs> */}

      <Scene key="search" component={Search} hideNavBar initial={true} />
    </Scene>
  </Lightbox>,
);

export default scenes;
