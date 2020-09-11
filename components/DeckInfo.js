import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Deck from './Deck'
import CustomButton from './CustomButton'
import { white, darkerred, black } from '../utils/colors'
import { connect } from 'react-redux'
import { removeDeck } from '../actions/index'
import { DeckDescription }  from './DeckDescription.js'

 /* Created the component that renders the on-deck-click screen, where the user can add a card or start the quiz */

export class DeckDetail extends Component {
  static propTypes = {
      navigation: PropTypes.object.isRequired,
      removeDeck: PropTypes.func.isRequired,
      deck: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  render() {
    const { state, navigation } = this.props;
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return (
      <View style={styles.container}>
          <View styles={styles.text} >
              <DeckDescription name={deck.title}></DeckDescription>
          </View>
          <Deck id={deck.title} />
          <View styles={styles.deckCentered}>
              <CustomButton
                  buttonStyle={styles.buttonStyleAdd}
                  textStyle={styles.textStyleAdd}
                  onPress={() =>
                    this.props.navigation.navigate('AddCard', { title: deck.title })
                  }
              >Add Card
              </CustomButton>
              <CustomButton
                  buttonStyle={styles.buttonStyleQuiz}
                  textStyle={styles.textStyleQuiz}
                  onPress={() =>
                    this.props.navigation.navigate('Quiz', { title: deck.title })
                  }
              > Start Quiz
              </CustomButton>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    backgroundColor: white
  },
  text: {
    fontStyle: 'italic',
    fontSize: 24,
    color: darkerred
  },
  deckCentered:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyleAdd: {
    backgroundColor: darkerred, 
    borderColor: darkerred
  },
  textStyleAdd:{
     color: white,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24,
     textShadowRadius: 6,
     textShadowColor: white
  },
  buttonStyleQuiz: {
    backgroundColor: white, 
    borderColor: darkerred
  },
  textStyleQuiz:{
    color: darkerred,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24,
     textShadowRadius: 6,
     textShadowColor: black
  }
});

const mapStateToProps = (state, { navigation }) => {
  return {
    state,
    navigation
  }
}


export default connect(mapStateToProps, { removeDeck })(DeckDetail);
