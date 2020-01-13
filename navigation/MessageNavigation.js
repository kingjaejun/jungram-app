import {createStackNavigation} from 'react-navigation';
import Messages from '../screens/Messages/Message';
import Message from '../screens/Messages/Message';
import { createStackNavigator } from 'react-navigation-stack';
import { stackStyles } from './config';

export default createStackNavigator({
    Messages,
    Message
},
{
    defaultNavigationOptions:{
        headerStyles:{...stackStyles}
    }
}
)