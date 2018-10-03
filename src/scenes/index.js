import React from 'react';
import { Actions, Scene, Tabs, Lightbox } from 'react-native-router-flux';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Place from './pages/Place';

const scenes = Actions.create(
  <Lightbox>
    <Scene key="root" hideNavBar>
      <Tabs key="tabs" hideTabBar animationEnabled={false}>
        <Scene key="home" component={Home} hideNavBar />
        <Scene key="profile" component={Profile} hideNavBar />
      </Tabs>

      <Scene key="search" component={Search} hideNavBar />
      <Scene key="place" component={Place} hideNavBar />
    </Scene>
  </Lightbox>,
);

export default scenes;
