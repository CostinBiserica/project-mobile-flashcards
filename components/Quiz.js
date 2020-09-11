import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import AndroidQuiz from './AndroidQuiz';
import { setLocalNotification, clearLocalNotification } from '../utils/notification';
import iOSQuiz from './iOSQuiz';

 /* Rendering the appropiate quiz type according to the platform */

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  /*Could not make it work, so for this part I had third party help */
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');

    if (Constants.platform.android) {
      return <AndroidQuiz title={title} />;
    }
    return <iOSQuiz title={title} />;
  }
}

export default Quiz;
