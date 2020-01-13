import React ,{useState} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
    justify-content:center;
    align-items: center;
    flex:1
`;



export default ({navigation}) => {
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables:{
            secret: confirmInput.value,
            email:navigation.getParam("email")
        }
    })
    const handleConfirm = async() => {
        const {value} =confirmInput;
        if(value==="" || !value.includes(" ")){
            return Alert.alert("Invalid secret");
        }
        try{
            setLoading(true);
            const {
                data:{confirmSecret}
            }= await confirmSecretMutation()
            if(confirmSecret !=="" || confirmSecret !== false){
                logIn(confirmSecret);
            }else{
                Alert.alert("Wrong secret!")
            }
        }catch(e){
            console.log(e);
            Alert.alert("Can't confirm secret");
        }finally {
            setLoading(false);
        }
    };
    return (
        //키보드가 열려있을 때 작동하고 다른 곳 클릭하면 닫히게 해줌
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...confirmInput} 
                    placeholder="Secret"  
                    returnKeyType="send" //키보드에 return 대신 send로 표시되게 바꿔줌
                    onSubmitEditing={handleConfirm}
                    autoCorrect={false}//자동으로 고쳐주는 것을 방지
                />
                <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
            </View>
        </TouchableWithoutFeedback>
    );
};