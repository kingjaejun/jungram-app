import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1
`;



export default () => {
    const emailInput = useInput("");
    const handelLogin = () => {
        const {value} =emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value === ""){
            return Alert.alert("Email can't be emrty");
        }else if (value.includes("@") || !value.includes(".")) {
            return Alert.alert("Please input an email");
        }else if (!emailRegex.test(value)){
            return Alert.alert("That email is invalid");
        }
    }
    return (
        //키보드가 열려있을 때 작동하고 다른 곳 클릭하면 닫히게 해줌
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...emailInput} 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    returnKeyType="send" //키보드에 return 대신 send로 표시되게 바꿔줌
                    onEndEditing={handelLogin}
                    autoCorrect={false}//자동으로 고쳐주는 것을 방지
                />
                <AuthButton onPress={handelLogin} text="Log In" />
            </View>
        </TouchableWithoutFeedback>
    );
};