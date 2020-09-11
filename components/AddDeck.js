import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';
import { darkerred, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitleAS } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';

export class AddDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    addDeck: PropTypes.func.isRequired
  };
     /* Defining initial state of the component */
  state = {
    title: ''
  };
  handleChange = (title) => {
    this.setState({ title });
  }
  handleSubmit = () => {
    if(this.state.title=== ''){
      return ToastAndroid.show("Please add a name for the new deck!",ToastAndroid.SHORT)
    }
    const { addDeck, navigation } = this.props;
    const { title } = this.state;

    addDeck(title);
    saveDeckTitleAS(title);
//I did not know exactly how to achieve this(to erase the stack and bounce to the DeckInfo of the new deck), so eventually someone helped me here.
    const openNewDeck = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'HomeScreen' }),
        NavigationActions.navigate({
          routeName: 'DeckInfo',
          params: { title: title }
        })
      ]
    });
    navigation.dispatch(openNewDeck);

    this.setState(() => ({ title: '' }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View>
          <TextInput
            style={styles.fieldInput}
            value={this.state.title}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
          />
        </View>
        <CustomButton
          textStyle={styles.textStyleNew}
          buttonStyle={styles.buttonStyleNew}
          onPress={this.handleSubmit}
        >Create Deck
        </CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    backgroundColor: darkerred
  },
  title: {
    marginTop: 35,
    textAlign: 'center',
    fontSize: 32,
    color: white
  },
  fieldInput: {
    borderBottomWidth:2,
    borderBottomColor: white,
    backgroundColor: darkerred,
    paddingLeft: 10,
    fontSize: 24,
    height: 60,
    marginBottom: 25,
    color: white
  },
  buttonStyleNew: {
    backgroundColor: darkerred, 
    borderColor: white
  },
  textStyleNew:{
     color: white,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24
  },
});

export default connect( null, { addDeck } )(AddDeck);
