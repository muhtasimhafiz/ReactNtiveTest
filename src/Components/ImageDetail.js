import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ImageDetail =(props) =>{
    console.log(props)

    return <View>
        
        <Image source={props.imageSource}/>
        <Text>props.title</Text>
        </View>
};

const styles =StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subHeaderStyle: {

    }
});

export default ImageDetail;