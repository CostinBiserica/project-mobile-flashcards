import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import CustomButton from './CustomButton';
import { gray, white, darkerred } from '../utils/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAS } from '../utils/api';

export class AddCard extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    addCardToDeck: PropTypes.func.isRequired
  };
   /* Defining initial state of the component */
  state = {
    question: '',
    answer: ''
  };
     /* The state gets changed when the input fields are updated */
  onQuestionChange = question => {
    this.setState({ question });
  };
  onAnswerChange = answer => {
    this.setState({ answer });
  };
     /* If the fields are empty the toast will show, else the card will be added to the deck */
  onSubmit = () => {
    if(this.state.question === '' || this.state.answer === ''){
      return ToastAndroid.show("Please complete the fields first!", ToastAndroid.SHORT)
    }
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };

    addCardToDeck(title, card);
    addCardToDeckAS(title, card);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };

  
  render() {
    return (
      <View style={styles.container}>
          <View>
              <View >
                  <Text style={styles.title}>Add your card idea to the deck</Text>
              </View>
              <View>
                  <TextInput
                    style={styles.inputField}
                    value={this.state.question}
                    onChangeText={this.onQuestionChange}
                    placeholder="Question"
                  />
              </View>
              <View>
                  <TextInput
                    style={styles.inputField}
                    value={this.state.answer}
                    onChangeText={this.onAnswerChange}
                    placeholder="Answer"
                  />
              </View>
              <CustomButton
                  buttonStyle={styles.buttonStyleSubmit}
                  textStyle={styles.textStyleSubmit}
                  onPress={this.onSubmit}
              >Add
              </CustomButton>
            </View>
          <View style={{ height: '30%' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 12,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  title: {
    fontStyle: 'italic',
    fontSize: 24,
    color: darkerred,
    marginBottom: 25
  },
  inputField: {
    borderBottomWidth:2,
    borderBottomColor: darkerred,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 24,
    height: 60,
    marginBottom: 25
  },
  buttonStyleSubmit: {
    marginTop:25,
    backgroundColor: darkerred, 
    borderColor: darkerred
  },
  textStyleSubmit:{
     color: white,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
  mapStateToProps,
  { addCardToDeck }
)(AddCard);