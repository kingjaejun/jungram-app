import {createStackNavigation} from 'react-navigation';
import Messages from '../screens/Messages/Message';
import Message from '../screens/Messages/Message';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator({
    Messages,
    Message
})