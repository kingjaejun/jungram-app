import React,{createContext, useContext, useState} from 'react';
import {AsyncStorage} from 'react-native';


export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn:isLoggedInProp, children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
    
    const logUserIn = async() => {
        try{
            //asyncstorage에서 로그인상태 체크
          await AsyncStorage.setItem("isLoggedIn", "true") //일반비동기처럼 바로 다음라인으로 넘어가지 않고, 결과값을 얻을때까지 기다린다
          setIsLoggedIn(true);
        }catch(e){
          console.log(e);
        }
      }
      const logUserOut = async() => {
        try{
          await AsyncStorage.setItem("isLoggedIn", "false");
          setIsLoggedIn(false);
        }catch(e){
            console.log(e)
        }
      }

    return (
        <AuthContext.Provider value={{isLoggedIn,logUserIn,logUserOut}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useIsLoggedIn = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return isLoggedIn;
};

export const useLogIn = () => {
    const {logUserIn} = useContext(AuthContext);
    return logUserIn;
};

export const useLogOut = () => {
    const {logUserOut} = useContext(AuthContext);
    return logUserOut;
};