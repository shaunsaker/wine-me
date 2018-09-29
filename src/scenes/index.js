import React from 'react';
import { Actions, Scene, Tabs, Lightbox } from 'react-native-router-flux';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Place from './pages/Place';

const scenes = Actions.create(
  <Lightbox>
    <Scene key="root" hideNavBar>
      <Tabs key="tabs" hideTabBar animationEnabled={false} initial={true}>
        <Scene key="home" component={Home} hideNavBar initial={true} />
        <Scene key="profile" component={Profile} hideNavBar initial={false} />
      </Tabs>

      <Scene key="search" component={Search} hideNavBar initial={false} />

      <Scene key="place" component={Place} hideNavBar initial={false} />
    </Scene>
  </Lightbox>,
);

export default scenes;
