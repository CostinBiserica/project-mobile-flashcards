import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { white, darkerred } from '../utils/colors';
import { connect } from 'react-redux';

 /* Creating the Deck component to display it in the app in differenet screens */

 const Deck = (props) => {
  const { deck } = props;

  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
        <View>
            <Text style={styles.deckTitle}>{deck.title}</Text>
        </View>
        <View>
            <Text style={styles.numberOfCards}>{deck.questions.length} cards</Text>
        </View>
    </View>
  );
};
Deck.propTypes = {
  deck: PropTypes.object
};

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 200,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: white,
    borderRadius: 55,
    marginBottom: 15,
    shadowColor: white,
    shadowOffset: {
        width: 0.25,
        height: 4,
    },
    elevation: 5,
    },
  deckTitle: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: darkerred
  },
  numberOfCards: {
    fontSize: 12
  }
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];
  return {
    deck
  };
};

export default connect(mapStateToProps)(Deck);
