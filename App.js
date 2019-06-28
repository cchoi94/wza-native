/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'

import WzaSelector from './components/WzaSelector'
import MusicPlayer from './components/MusicPlayer'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

class Home extends Component {

  static navigationOptions = {
    title: 'Wza',
    headerStyle: {
      backgroundColor: '#1D1E25',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      // fontWeight: 900,
      // fontSize: 30
    },
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.homeContainer}>
        <Text style={styles.heroTitle}>
          What are you hitting?
        </Text>
        <View style={styles.strainButtonContainer}>
          <Button title="Sativa" titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#A166AB','#EF4E7B','#F37055','#F79533'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }} 
            onPress={() => this.props.navigation.navigate('WzaSelector', {
            strain: 'sativa'
          })} />
          <Button title="Indica" titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#6FBA82','#07B39B','#1098AD','#5073B8'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }} 
            onPress={() => this.props.navigation.navigate('WzaSelector', {
            strain: 'indica'
          })} />
          <Button title="Artist Of The Week" titleStyle={[styles.buttonTitleStyle, styles.aowButtonTitleStyle]} buttonStyle={[styles.buttonStyle, styles.aowButtonStyle]}
            onPress={() => this.props.navigation.navigate('MusicPlayer', {
            artist_of_the_week: true
          })} />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 8
  },
  heroTitle: {
    flex: 0.25,
    fontSize: 32,
    textAlign: 'center',
    color: '#fff'
  },
  strainButtonContainer: {
    flex: 0.25
  },
  buttonTitleStyle: {
    fontSize: 32,
    textTransform: 'uppercase',
    fontWeight: '900'
  },
  buttonStyle: {
    height: 80,
    borderRadius: 50,
    marginBottom: 40,
    marginTop: 20,
  },
  aowButtonStyle: {
    backgroundColor: '#fff'
  },
  aowButtonTitleStyle: {
    color: '#1D1E25'
  }
})

const Navigator = createStackNavigator({
  Home: Home,
  WzaSelector: WzaSelector,
  MusicPlayer: MusicPlayer,
  },
  {
    cardStyle: {
      backgroundColor: '#1D1E25',
    }
  }
);

const AppContainer = createAppContainer(Navigator)