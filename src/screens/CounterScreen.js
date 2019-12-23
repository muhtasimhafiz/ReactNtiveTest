import React, {useState,useReducer} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const reducer=(state, action)=>{
    switch (action.type) {
        case 'increment':
            return {...state, counter: state.counter + action.payload};
        case 'decrement' :
            return { ...state, counter: state.counter - action.payload};
        default:
            return state;
    }

}


const CounterScreen =() =>{

    //const[counter,setcounter] = useState(0);
    const [state, dispatch]= useReducer (reducer,{counter: 0})
    const {counter}=state;



    return <View>
        <Button
            title="Increase"
            onPress={()=>{
                //setcounter(counter+1);
                dispatch({type:'increment', payload: 1})
                console.log(counter);

            }
            
            }
        />

        <Button
            title="Decrease"
            onPress={()=>{
                //setcounter(counter-1);
                dispatch({type:'decrement', payload: 1})
                
                console.log(counter);

            }
            
            }
        />

        <Text>{counter}</Text>

    </View>
};

const styles =StyleSheet.create({
    textStyle: {
        fontSize: 45
    },
    subHeaderStyle: {

    }
})

export default CounterScreen;