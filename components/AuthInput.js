import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../screens/constants';

const Container = styled.view`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${constants.width / 2}
    padding:10px;
    border: 0.5px solid ${props=>props.theme.darkgreyColor}
    background-color: ${props=>props.theme.greyColor}
    border-radius: 4px;
`;

const AuthInput = ({
    placeholder,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    onChange,
    returnKeyType = "done", //기본값 done
    onEndEditing = () => null,
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
            onEndEditing={onEndEditing} //입력다하고 send보냈을 때 작동 null이라 아무것도 안함
        />    
    </Container>
);

AutoInput.propTypes ={
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
    returnKeyType:PropTypes.oneOf([done,"go","next","search","send"]),
    onEndEditing:PropTypes.func,
    autoCorrect: PropTypes.bool
};
export default AuthInput;