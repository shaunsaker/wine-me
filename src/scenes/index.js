import React from 'react';
import { Actions, Scene, Tabs } from 'react-native-router-flux';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Tabs key="tabs" hideNavBar hideTabBar lazy animationEnabled={false} initial={true}>
      <Scene key="home" component={Home} type="replace" hideNavBar initial={true} />
      <Scene key="profile" component={Profile} type="replace" hideNavBar initial={false} />
    </Tabs>

    <Scene key="search" component={Search} hideNavBar initial={false} />
  </Scene>,
);

export default scenes;
