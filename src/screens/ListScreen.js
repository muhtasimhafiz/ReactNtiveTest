import React from 'react';
import {View, Text, StyleSheet, FlatListProperties} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ListScreen = () => {

    const friends =[
        {name: 'Friend #1a'},
        {name: 'Friend #2'},
        {name: 'Friend #3'},
        {name: 'Friend #4'},
        {name: 'Friend #5'},
        {name: 'Friend #6'},
        {name: 'Friend #7'},
        {name: 'Friend #8'},
        {name: 'Friend #9'},

    ]


    return (<FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    KeyExtractor={(friend)=> friend.name}                  //unique, common acrosss all array
    data={friends}
    renderItem={({item}) => {
        return <Text style={styles.textStyle}>{item.name}</Text>

    }}
           />
    )};
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        marginVertical: 50
    }
});

export default ListScreen;