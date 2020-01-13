import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import {Ionicons} from '@expo/vector-icons'
import styles from '../styles'
import NavIcon from './NavIcon';
const Container = styled.TouchableOpacity`
    padding-right:20px;
`;

/*withNavigation이 감싸고 있는 컴포넌트에 
navigation prop을 전달해주는
Higher-Order 컴포넌트이다 navigation prop을 
직접 컴포넌트로 전달할 수 없을 때 사용*/
export default withNavigation(({navigation}) => (
    <Container onPress={ () => navigation.navigate("MessageNavigation")}>
        <NavIcon name={Platform.OS ==="ios" ? "ios-paper-plane":"md-paper-plane"}/>
    </Container>
));