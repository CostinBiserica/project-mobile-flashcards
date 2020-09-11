import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { white, darkerred } from '../utils/colors';
import { handleInitialData } from '../actions/index';

 /* Created the component that renders the decks on the home screen as a list*/

export class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleInitialData: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titlebg}>
          <Text style={styles.title}>Mobile Flashcards! How well do you know the Avengers Characters?</Text>
          <Image  source= {require('../utils/avengers.png')}></Image>
          <Text style={styles.subtitle}>Take one of the quizzes below to find out!</Text>
        </View>
        {Object.values(decks).map(deck => {
          return (
            <TouchableOpacity style={styles.decks}
                key={deck.title}
                onPress={() =>
                  navigation.navigate('DeckInfo', { title: deck.title })
                }>
                <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    backgroundColor: darkerred
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
    color: white
  },
  titlebg: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:16
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    color: white
  },
  decks: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  }
});

const mapStateToProps = state => ({ decks: state });

export default connect( mapStateToProps, { handleInitialData } )(DeckList);
