import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Constants from 'expo-constants';
import { setLocalNotification } from './utils/notification';
import MainTabNavigator from './navigation/Navigator';
import { darkerred } from './utils/colors'

const store = createStore( reducer, applyMiddleware(thunk, logger));

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
       /* Provider for Redux*/
      <Provider store={store}>
        <View style={styles.container}>
        <StatusBar translucent backgroundColor={darkerred} height={Constants.statusBarHeight} />
          <MainTabNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde'
  }
});
