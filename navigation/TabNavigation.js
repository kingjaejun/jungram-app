import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import {View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import {Platform} from 'react-native';
import { stackStyles } from './config';


const stackFactory = (initialRoute,customConfig)=> 
    createStackNavigator({
        initialRoute:{
            screen:initialRoute,
            navigationOptions:{
                ...customConfig
            }
        }
    },
    {
        defaultNavigationOptions:{
            headerStyle:{...stackStyles},
            headerBackTitle:null
        }
    }
    );


export default createBottomTabNavigator(
    {
        Home:{
            screen: stackFactory(Home,{
                headerRight : () => <MessagesLink />,
                headerTitle:(
                    <NavIcon
                        name="logo-instagram"
                        size={36}
                    />
                )        
            }),
            navigationOptions:{
                tabBarIcon:({focused}) => (
                    <NavIcon 
                        focused={focused}
                        name={Platform.OS ==="ios" ? "ios-home": "md-home"} 
                         
                    />
                )
            }
        }, 
        Search:{
            screen:stackFactory(Search,{
                title:"Search"
            }),
            navigationOptions:{
                tabBarIcon:({focused}) =>(
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                    />
                )
            }
        },
        Add:{
            screen:View,
            navigationOptions:{
                tabBarOnPress:({navigation})=> 
                    navigation.navigate("PhotoNavigation"),
                    tabBarIcon:({focused}) =>(
                        <NavIcon
                            focused={focused}
                            name={Platform.OS ==="ios"? "ios-add":"md_add"}
                            size={32} 
                        />
                    )
            }
        },
        Notification:{
            screen: stackFactory(Notification,{
                title:"Notifications"
            }),
            navigationOptions:{
                tabBarIcon:({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios"
                            ? focused
                            ? "ios-heart"
                            : "ios-heart-empty"
                            :focused
                            ? "md-heart"
                            :"md-heart-empty"
                        }
                        
                    />
                )
            }
        },
        Profile:{
            screen:stackFactory(Profile,{
                title:"Profile"
            }),
            navigationOptions:{
                tabBarIcon:({focused}) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS==="ios"?"ios-person":"md-person"}
                         
                    />
                )
            }
        }
    },
    {
    tabBarOptions:{
        showLabel:false,
        style:{
            backgroundColor:"#FAFAFA"
        }
    }
    }
);
