import React, { useState } from "react";
import { ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo-hooks';
import Loader from "../../../components/Loader";
import SquarePhoto from '../../../components/SquarePhoto';
export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
        }
    }
`;
//shouldFetch는 쿼리를 요청하기 위한 신호
//검색쿼리는 즉시 요청이 안되기 때문에
const SearchPresenter = ({term, shouldFetch}) => {
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading, refetch} = useQuery(SEARCH, {
        variables:{
            term
        },
        skip: !shouldFetch,//언제 쿼리를 조회하지 않고 넘길 지 정할 수 있다
        fetchPolicy:"network-only" //캐시에서 바로 가져오는 걸 방지함
    });
    console.log(data, loading);
    const onRefresh = async() => {
        try{
            setRefreshing(true);
            await refetch({variables:{term} });
        }catch (e){
        }finally{
            setRefreshing(false);
        }
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh} 
                    refreshing={refreshing} 
                />
            }
        >{loading ? <Loader /> : data && data.searchPost && data.searchPost.map(post=> <SquarePhoto key={post.id} {...post}/>)} 
        </ScrollView>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;