import React from 'react';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;
/*withNavigation이 감싸고 있는 컴포넌트에 
navigation prop을 전달해주는
Higher-Order 컴포넌트이다 navigation prop을 
직접 컴포넌트로 전달할 수 없을 때 사용*/
export default withNavigation(({navigation}) => (
    <Container onPress={ () => navigation.navigate("MessageNavigation")}>
        <Text>Messages</Text>
    </Container>
));