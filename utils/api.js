import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const DECKS_KEY = 'Reactnd-Project-MobileFlashcards';

 /* Created different async functions to help me get the data*/

export function getData() {
  return decks;
}

export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_KEY);

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeckTitleAS(title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function removeDeckAS(key) {
  try {
    const results = await AsyncStorage.getItem(DECKS_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDeckAS(title, card) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}
