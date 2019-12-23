import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const textScreen =() =>{

    return <View>
        <TextInput 
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
        
        />
    </View>
};

const styles =StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subHeaderStyle: {

    },

    input: {
        margin: 15,
        borderColor: 'black',
        borderWidth: 1
        
    }

})

export default textScreen;