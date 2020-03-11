import React ,{useState} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT} from './AuthQueries';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;
const GoogleContainer = styled.View`
  margin-top: 20px;
`;

export default ({navigation}) => {
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const emailInput = useInput(navigation.getParam("email", ""));
    const usernameInput = useInput("")
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables :{
            username: usernameInput.value,
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value
        }
    });
    const handleSignUp = async() => {
        const {value: email} =emailInput;
        const {value: fName} =fNameInput;
        const {value: lName} =lNameInput;
        const {value: username} =usernameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)){
            return Alert.alert("That email is invalid");
        }
        if(fName === "" || lName===""){
          return Alert.alert("I need your Name")
        }
        if(username === ""){
            return Alert.alert("Invalid username")
        }
        try{
            setLoading(true);
            const { 
                data: {createAccount}
            } = await createAccountMutation();
            if(createAccount){
                Alert.alert("Account created", "Log in instead!")
                navigation.navigate("Login",{email});
            }
        }catch(e){
            Alert.alert("Username taken.")
            navigation.navigate("Login", {email})
            console.log(e);
        }finally{
            setLoading(false);
        };
    }
    const fbLogin = async() => {
        await Facebook.initializeAsync("696031354137422");
        try {
            setLoading(true)
            const {type,token} = await Facebook.logInWithReadPermissionsAsync(
                "696031354137422",
                {
                    permissions: ['public_profile'],
                }
            );
            if (type === 'success') {
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
              const {email, first_name, last_name} = await response.json();
              updateFormData(email,first_name,last_name)
              setLoading(false)
            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    };
    const googleLogin = async() => {
        const GOOGLE_ID = "795142125342-1568qapom4s069dhb8mpplbfupne0oeh.apps.googleusercontent.com";
        try{
            setLoading(true);
            const result = await Google.logInAsync({
                iosClientId: GOOGLE_ID,
                scopes:['profile', 'email']
            });
            if (result.type ==='success'){
                console.log(result);
                const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${result.accessToken}`} 
            });
            const {email, family_name, given_name} = await user.json();
            updateFormData(email, given_name,family_name)
            }else{
                return {cancelled:true};
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    };
    const updateFormData = (email, firstName, lastName) => {
        emailInput.setValue(email);
        fNameInput.setValue(firstName);
        lNameInput.setValue(lastName);
        const [username] = email.split("@");
        usernameInput.setValue(username);
    }
    return (
        
        //키보드가 열려있을 때 작동하고 다른 곳 클릭하면 닫히게 해줌
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...fNameInput} 
                    placeholder="First name" 
                    autoCapitalize="words"
                   
                />
                   <AuthInput 
                    {...lNameInput} 
                    placeholder="Last name" 
                    autoCapitalize="words"
                  
                />
                   <AuthInput 
                    {...emailInput} 
                    placeholder="Email" 
                    keyboardType="email-address" 
                    returnKeyType="send"
                    autoCorrect={false}//자동으로 고쳐주는 것을 방지
                    
                />
                   <AuthInput 
                    {...usernameInput} 
                    placeholder="Username" 
                    returnKeyType="send" 
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleSignUp} text="Sign Up" />
                <FBContainer>
                    <AuthButton 
                        bgColor={"#2D4DA7"}
                        loading={false} 
                        onPress={fbLogin}
                        text="Connect Facebook"
                    />  
                </FBContainer>
                <GoogleContainer>
                <AuthButton 
                    bgColor={"#EE1922"}
                    loading={false} 
                    onPress={googleLogin}
                    text="Connect Google"
                />  
                </GoogleContainer>
            </View>
        </TouchableWithoutFeedback>
        
        
    );
};