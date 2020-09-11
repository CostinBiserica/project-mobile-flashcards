import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import  ViewPager from '@react-native-community/viewpager'
import CustomButton from './CustomButton';
import { green, darkerred, black, white, darkergreen } from '../utils/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

 /* Created constants to prevent misspelling */

const isShowing = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

export class AndroidQuiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };
   /* Initial state */
  state = {
    showScreen: isShowing.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  /* Every time the user changes the question, the state updates the showScreen so the shown screen it's the question one */
  handlePageChange = () => {
    this.setState({
      showScreen: isShowing.QUESTION
    });
  };
  /* Every time the user answers a question, the state updates the correct/incorrect according to the user's answer to store the results and updates the value in the array */
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, index) => (page === index ? 1 : val))
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;
        /* When the initial question count equal the correct and incorrect responses, it means the user finished 
        the quiz and changed the isShowing to RESULT so the result page will be rendered or else, it switches automatically to the next question */
        if (questionCount === correct + incorrect) {
          this.setState({ showScreen: isShowing.RESULT });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            showScreen: isShowing.QUESTION
          }));
        }
      }
    );
  };
  /* If the user restarts he quiz, the state it's set as the initial one */
  handleReset = () => {
    this.setState(prevState => ({
      showScreen: isShowing.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { showScreen } = this.state;
/* If there are no cards in the deck, the following screen will be rendered */
    if (questions.length === 0) {
      return (
        <View style={styles.container}>
          <View >
            <Text style={ {textAlign: 'center', fontSize: 32} }>
              Oh snap.. it looks like the deck is empty.. thus you cannot play with it.
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }
/* If isShowing state it's ..Result, the following screen will be rendered */
    if (this.state.showScreen === isShowing.RESULT) {
      const { correct, questionCount } = this.state;
      const percentage = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle = percentage >= 70 ? styles.goodResult : styles.badResult;

      return (
        <View style={styles.questionPage}>
          <View >
            <Text style={styles.resultsTitle}>
              Congratulations on completing the quiz! Below you can see how well you know your Avengers heroes!
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct 
            </Text>
            <Text style={resultStyle}>
              You've responded correctly to {percentage}% of the questions!
            </Text>
            
          </View>
          <View /* Rendering the 3 options, Restart Quiz, Back to deck and Home */>
            <CustomButton
              textStyle={styles.textStyleShow}
              buttonStyle={styles.buttonStyleShow}
              onPress={this.handleReset}
            >
              Restart Quiz
            </CustomButton>
            <CustomButton
              textStyle={styles.textStyleShow}
              buttonStyle={styles.buttonStyleShow}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >Back To Deck
            </CustomButton>
            <CustomButton
              textStyle={styles.textStyleShow}
              buttonStyle={styles.buttonStyleShow}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('HomeScreen');
              }}
            >
              Home
            </CustomButton>
          </View>
        </View>
      );
    }
/* If isShowing state it's not ..Result, the following screen will be rendered, changind only the button "show answer/show question" according tot the isShowing state */
    return (
      <ViewPager
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, index) => (
          <View style={styles.questionPage} key={index}>
            <View >
              <Text style={styles.questionNumber}>
                {index + 1} / {questions.length}
              </Text>
            </View>
            <View style={styles.questionContainer}>
              
              <View style={styles.questionBody}>
                <Text style={styles.questionContent}>
                  {showScreen === isShowing.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {showScreen === isShowing.QUESTION ? (
              <CustomButton
                buttonStyle={styles.buttonStyleShow}
                textStyle={styles.textStyleShow}
                onPress={() => this.setState({ showScreen: isShowing.ANSWER })}
              >Show me the answer
              </CustomButton>
            ) : (
              <CustomButton
                buttonStyle={styles.buttonStyleShow}
                textStyle={styles.textStyleShow}
                onPress={() => this.setState({ showScreen: isShowing.QUESTION })}
              >Get back to question
              </CustomButton>
            )}
            <View>
              <CustomButton
                buttonStyle={styles.buttonStyleCorrect}
                textStyle={styles.textStyleCorrect}
                onPress={() => this.handleAnswer(answer.CORRECT, index)}
              >Correct
              </CustomButton>
              <CustomButton
                buttonStyle={styles.buttonStyleIncorrect}
                textStyle={styles.textStyleIncorrect}
                onPress={() => this.handleAnswer(answer.INCORRECT, index)}
              >Incorrect
              </CustomButton>
            </View>
          </View>
        ))}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionPage: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    backgroundColor: white,
    justifyContent: 'center'
  },
  questionNumber: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic'
  },
  resultsTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: black
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    backgroundColor: white,
    paddingLeft: 24,
    paddingRight: 24,
    flexGrow: 1
  },
  questionBody: {
    flex: 1,
    justifyContent: 'center'
  },
  questionContent: {
    fontSize:35,
    textAlign: 'center',
    color: darkerred,
    fontWeight: 'bold'
  },
  questionType: {
    textAlign: 'left',
    fontSize: 20,
    fontStyle:'italic'
  },
  goodResult: {
    color: green,
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20
  },
  badResult: {
    color: darkerred,
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonStyleShow: {
    backgroundColor: white, 
    borderColor: darkerred
  },
  textStyleShow:{
     color: black,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24,
     textShadowRadius: 6,
     textShadowColor: white
  },
  buttonStyleCorrect: {
    backgroundColor: green, 
    borderColor: darkergreen
  },
  textStyleCorrect:{
    color: white,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24,
     textShadowRadius: 6,
     textShadowColor: black
  },
  buttonStyleIncorrect: {
    backgroundColor: darkerred, 
    borderColor: darkerred
  },
  textStyleIncorrect:{
     color: white,
     fontWeight: 'bold',
     fontStyle: 'italic',
     fontSize: 24,
     textShadowRadius: 6,
     textShadowColor: black
  }
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(AndroidQuiz));
