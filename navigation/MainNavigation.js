import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TabNavigation from './TabNavigation'
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';

const MainNavigation = createStackNavigator(
    {
    TabNavigation,
    PhotoNavigation,
    MessageNavigation
    },
    {
        headerMode:"none",
        mode:"modal"
    }
);

export default createAppContainer(MainNavigation);
