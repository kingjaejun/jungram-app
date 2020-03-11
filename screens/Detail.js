import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Loader from '../components/Loader';
import Post from '../components/Post';
import {POST_FRAGMENT} from '../fragments';
import {ScrollView} from 'react-native'

const View =styled.View``;

const POST_DETAIL = gql`
    query seeFullPost($id: String!){
        seeFullPost(id: $id){
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;
export default ({navigation}) => {
    const {loading, data } = useQuery(POST_DETAIL, {
        variables:{id:navigation.getParam("id") }
    });
    return (
        <ScrollView styled={{ flex:1 }}>
            {loading ? (
                <Loader />
            ) : (
                data && data.seeFullPost && <Post { ...data.seeFullPost} />
            )}
        </ScrollView>
    );
}