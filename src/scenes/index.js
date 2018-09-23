import React from 'react';
import { Actions, Scene, Tabs } from 'react-native-router-flux';

import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';

const scenes = Actions.create(
  <Scene key="root" hideNavBar>
    <Tabs key="tabs" hideNavBar hideTabBar lazy animationEnabled={false} initial={true}>
      <Scene key="home" component={Home} type="replace" hideNavBar initial={true} />
      <Scene key="search" component={Search} type="replace" hideNavBar initial={false} />
      <Scene key="profile" component={Profile} type="replace" hideNavBar initial={false} />
    </Tabs>
  </Scene>,
);

export default scenes;
