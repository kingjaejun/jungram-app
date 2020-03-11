import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${constants.width / 1.7}
    padding:10px;
    border: 0.5px solid ${props=>props.theme.darkgreyColor}
    background-color: ${props=>props.theme.greyColor}
    border-radius: 4px;
    background:transparent;
    border:none;

`;

const AuthInput = ({
    placeholder,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    onChange,
    returnKeyType = "done", //기본값 done
    onSubmitEditing = () => null,
    autoCorrect = true
}) => (
    <Container>
        <TextInput
            onChangeText={onChange}
            keyboardType ={keyboardType}
            returnKeyType={returnKeyType}
            placeholder ={placeholder}
            autoCapitalize ={autoCapitalize}
            value={value}
            autoCorrect={autoCorrect}
            onSubmitEditing={onSubmitEditing} //입력다하고 send보냈을 때 작동 null이라 아무것도 안함
        />    
    </Container>
);

AuthInput.propTypes ={
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType:PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        'numeric',
        "email-address",
        "phone-pad"
    ]),
    autoCapitalize:PropTypes.oneOf(["none","sentences","words","characters"]),
    onChange:PropTypes.func.isRequired,
    returnKeyType:PropTypes.oneOf(["done","go","next","search","send"]),
    onSubmitEditing:PropTypes.func,
    autoCorrect: PropTypes.bool
};
export default AuthInput;