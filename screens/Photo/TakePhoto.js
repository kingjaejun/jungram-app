import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;
//props로 navigation을 갖는다
export default ({navigation}) => (
  <View>
        <TouchableOpacity onPress={()=> navigation.navigate("UploadPhoto")}>
            <Text>Take</Text>
        </TouchableOpacity>   
  </View>
);