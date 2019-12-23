import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { startAsync } from 'expo/build/AR';

const boxScreen =() =>{

    return <View style={styles.viewStyle}>
        <Text >C#1</Text>
        <Text >C#2</Text>
        <Text >C#3</Text>
    </View>
};

const styles =StyleSheet.create({
    textStyle: {
        borderWidth: 3,
        borderColor: 'red',
        
    },

    textStyle_1: {
        borderWidth: 3,
        borderColor: 'red',
        
    },

    textStyle_2: {
        borderWidth: 3,
        borderColor: 'red',
        
    },

    textStyle_3: {
        borderWidth: 3,
        borderColor: 'red',
        
    },

    subHeaderStyle: {

    },
    viewStyle: {
        borderWidth: 3,
        borderColor: 'black',
        alignItems: "center",
        justifyContent: "center",
        height: 200
        
    
    }
})

export default boxScreen;