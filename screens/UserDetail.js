import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../components/Loader';
import {ScrollView} from 'react-native'
import UserProfile from '../components/UserProfile';
import { USER_FRAGMENT } from '../fragments';
const GET_USER = gql`
    query seeUser($username: String!){
        seeUser(username: $username){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;
export default ({navigation}) => {
    const {loading, data } = useQuery(GET_USER, {
        variables:{username:navigation.getParam("username") }
    });
    return (
        <ScrollView styled={{ flex:1 }}>
            {loading ? (
                <Loader />
            ) : (
                data && data.seeUser && <UserProfile { ...data.seeUser} />
            )}
        </ScrollView>
    );
}