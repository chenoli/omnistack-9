import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import List from './pages/List';
import Login from './pages/Login';
import Booking from './pages/Booking';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Booking,
  })
);

export default Routes;
