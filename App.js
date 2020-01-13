import React, {useState, useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import ApolloClient from 'apollo-boost';
import options from './apollo';
import {ThemeProvider} from 'styled-components';
import {ApolloProvider} from 'react-apollo-hooks';
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

//state 두가지 loaded,boolean true,false client,object있어야하고 기본은 null

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const preLoad = async() => {
    // await AsyncStorage.clear();
    try{
      await Font.loadAsync({
      ...Ionicons.font
    });
    await Asset.loadAsync([require("./assets/logo.png")]);
    const cache = new InMemoryCache();
    await persistCache({
      cache,
      storage: AsyncStorage,
    });
    
    const client = new ApolloClient({
      cache,
      request: async operation => {
        const token = await AsyncStorage.getItem("jwt");
        return operation.setContext({
          headers:{Authorization: `Bearer ${token}`}
        })
      },
      ...options,
    });
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if(!isLoggedIn || isLoggedIn === "false"){
      setIsLoggedIn(false)
    }else{
      setIsLoggedIn(true);
    }
    setLoaded(true);
    setClient(client);
    } catch(e) {
      console.log(e)
    }
  };
  useEffect(() => {
    preLoad(); //호출
  }, []);



  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
