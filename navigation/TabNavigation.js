import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Notification from '../screens/Tabs/Notification';
import Profile from '../screens/Tabs/Profile';
import {View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import {Platform} from 'react-native';
import { stackStyles } from './config';
import Detail from '../screens/Detail';
import styles from '../styles';
import UserDetail from '../screens/UserDetail';

const stackFactory = (initialRoute,customConfig)=> 
    createStackNavigator({
        initialRoute:{
            screen:initialRoute,
            navigationOptions:{
                ...customConfig    
            }
        },
        Detail:{
            screen:Detail,
            navigationOptions:{
                //뒤로가기 버튼 색깔
                title:"Photo"
            }
        },
        UserDetail:{
            screen: UserDetail,
            navigationOptions:{
                title: "User"
            }
        }
    },{
        defaultNavigationOptions:{
            headerBackTitle: null,
            headerTintColor: styles.blackColor,
            headerStyle:{...stackStyles}
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
                headerBackTitle : null
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
    initialRouteName:"Profile",
    tabBarOptions:{
        showLabel:false,
        style:{
            backgroundColor:"#FAFAFA"
        }
    }
    }
);
