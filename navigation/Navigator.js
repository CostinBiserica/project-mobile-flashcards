import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import * as Icon from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import DeckInfo from '../components/DeckInfo';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';

import { white, darkerred } from '../utils/colors';

 /* Creating the routes for the navigation */
const routeConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="home" size={30} color={tintColor}
        />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add deck',
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="plus" size={30} color={tintColor} />
      )
    }
  }
};

routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
routeConfigs.AddDeck.navigationOptions.tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
 /* Creating the configuration for the tabs */
const tabNavigatorConfig = {
  navigationOptions: {
    headerShown: false
  },
  defaultNavigationOptions: {
    bounces: true,
    headerTitleAlign: 'center' 
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 65,
      backgroundColor: darkerred,
      borderTopColor: darkerred
    },
    labelStyle: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    showIcon: true,
  
}
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

 /* Creating the component that renders the screens and manages the navigation through the app*/

const MainNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: Tabs
    },
    DeckInfo: {
      screen: DeckInfo,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkerred,
        },
        title: 'Deck Info'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkerred
        },
        title: 'Add Card to the selected deck'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: darkerred
        },
         title: 'Quiz'
      }
    }
  }
);

export default createAppContainer(MainNavigator);
