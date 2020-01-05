import React from 'react';
import styled from 'styled-components';
import constants from '../screens/constants';
import PropTypes from "prop-types"

const Container = styled.View`
    background-color: ${props => props.theme.blueColor};
    padding: 10px;
    margin: 0px 50px; 
    border-radius: 4px;
    width: ${constants.width / 2};
`;
//margin 상하로 0px 좌우로 50px;
const Text = styled.Text`
    color: white;
    text-align:center;
    font-weight: 600;
`;
const Touchable = styled.TouchableOpacity``;
const AuthButton = ({text, onPress}) => (
    <Touchable onPress={onPress}>
        <Container>
            <Text>{text}</Text>
        </Container>
    </Touchable>
);

AuthButton.propTypes ={
    text:PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default AuthButton;