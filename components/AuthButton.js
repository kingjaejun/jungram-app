import React from 'react';
import styled from 'styled-components';
import constants from '../screens/constants';
import PropTypes from "prop-types"
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
    background-color: ${props =>
        props.bgColor? props.bgColor: props.theme.blueColor};
    padding: 10px;
    margin: 0px 50px; 
    border-radius: 4px;
    width: ${constants.width / 1.7};
`;
//margin 상하로 0px 좌우로 50px;
const Text = styled.Text`
    color: white;
    text-align:center;
    font-weight: 600;
`;
const Touchable = styled.TouchableOpacity``;
const AuthButton = ({text, onPress, loading=false, bgColor=null}) => (
    <Touchable disabled={loading} onPress={onPress}>
        <Container bgColor={bgColor}>
            {loading? <ActivityIndicator color={"white"} />:<Text>{text}</Text>}
        </Container>
    </Touchable>
);

AuthButton.propTypes ={
    loading: PropTypes.bool,
    text:PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default AuthButton;