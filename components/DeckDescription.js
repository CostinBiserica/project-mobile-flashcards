import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { darkerred, white } from '../utils/colors'

export const  DeckDescription = ({name}) =>{
return(
        <View style={styles.container}>
            <Text style={styles.text}>Let's see how good you are! In this screen you can answer the questions created about {name} or you can can add some questions!</Text>
        </View>
)
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: white
      },
    text: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 24,
        color: darkerred
    }
  });
