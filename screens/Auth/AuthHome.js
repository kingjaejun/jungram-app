import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../constants';
import AuthButton from '../../components/AuthButton';
const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5};
    margin-bottom: 0px;
`;
 
const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
    margin-top: 20px;
    color:${props => props.theme.blueColor};
    font-weight: 600;
`;

export default ({navigation}) => (
    <View>
        <Image resizeMode={"contain"} source={require('../../assets/logo.png')}/>      
        <AuthButton
            text={"Creat New Account"}
            onPress={()=>navigation.navigate("SignUp")} 
        />
        <Touchable onPress={()=>navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);