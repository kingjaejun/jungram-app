import React from 'react';
import {withNavigation} from 'react-navigation';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import constants from '../constants';
import {Image} from 'react-native';
const SquarePhoto = ({navigation,files = [], id}) => (
    <TouchableOpacity onPress={ () => navigation.navigate("Detail", {})}>
        <Image 
            source={{uri:files[0].url}} 
            style={{width: constants.width / 3 , height:constants.height / 6}}
        />
    </TouchableOpacity>

);


SquarePhoto.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired
}

export default withNavigation(SquarePhoto);