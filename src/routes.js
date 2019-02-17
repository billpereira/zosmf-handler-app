import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
// import New from './pages/New';

const Routes = createAppContainer(
	createSwitchNavigator({
        // Login,
        App: createStackNavigator({
            Login,
            MainMenu,
            // New
        })
	})
);

export default Routes;
