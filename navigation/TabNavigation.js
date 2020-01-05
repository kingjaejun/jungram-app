import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import {View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import MessagesLink from '../components/MessagesLink';
const stackFactory = (initialRoute,customConfig)=> createStackNavigator({
    initialRoute:{
        screen:initialRoute,
        navigationOptions:{...customConfig}
    }
});


export default createBottomTabNavigator({
    Home:{
        screen: stackFactory(Home,{
            title:"Home",
            headerRight : () => <MessagesLink />  
        })
    }, 
    Search:{
        screen:stackFactory(Search,{
            title:"Search"
        })
    },
    Add:{
        screen:View,
        navigationOptions:{
            tabBarOnPress:({navigation})=> navigation.navigate("PhotoNavigation")
        }
    },
    Notification:{
        screen: stackFactory(Notification,{
            title:"Notifications"
        })
    },
    Profile:{
        screen:stackFactory(Profile,{
            title:"Profile"
        })
    }
});
