import React,{useState} from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import {ScrollView, RefreshControl} from 'react-native';
import Post from '../../components/Post';
import {POST_FRAGMENT} from '../../fragments';
const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    } 
  }
  ${POST_FRAGMENT}
`;
export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading ,data, refetch } = useQuery(FEED_QUERY);
  const refresh = async() => {
    try{
      setRefreshing(true);
      await refetch();
    }catch(e){
      console.log(e);
    }finally{
      setRefreshing(false);
    }
  }
  console.log(loading,data)
  return (
  <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={refresh} />
    }
  >
    {loading ? (
    <Loader />
    ) :( 
      data &&
      data.seeFeed &&
      data.seeFeed.map(post => <Post key={post.id} {...post} />
    )
    )}
  </ScrollView>
  );
};