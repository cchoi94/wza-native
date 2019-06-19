import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'


export default class WzaSelector extends Component {

  static navigationOptions = {
    title: 'Feeling',
    headerStyle: {
      backgroundColor: '#1D1E25',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props)
    this.state = {

    }
  }


  componentDidMount() {
    console.log(this.props.navigation.state.params)
    //if sativa do this, if indica do that
    console.log(this.props)
  }

  render() {

    const strainContainer = (strain) => {
      if (strain.strain === "sativa") {
        return (
            <ScrollView contentContainerStyle={styles.buttonContainer}>
              <Button titleStyle={[styles.buttonTitle, styles.sativaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.sativaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="In a Mood"
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain, 
                  mood: 'in_a_mood'}
                )} />
              <Button titleStyle={[styles.buttonTitle, styles.sativaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.sativaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Breakthrough" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain, 
                  mood: 'breakthrough'}
                )} />
              <Button titleStyle={[styles.buttonTitle, styles.sativaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.sativaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="In the Stratosphere" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                {strain: this.props.navigation.state.params.strain,
                mood:'in_the_stratosphere'}
                )} />
              <Button titleStyle={[styles.buttonTitle, styles.sativaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.sativaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Faded" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain,
                  mood:'faded'}
                )} />
            </ScrollView>
        )
      } else if (strain.strain === 'indica') {
        return (
        <ScrollView contentContainerStyle={styles.buttonContainer}>
              <Button titleStyle={[styles.buttonTitle, styles.indicaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.indicaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Feeling Like A Potato" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain,
                  mood:'feeling_like_a_potato'}
                  )} />
              <Button titleStyle={[styles.buttonTitle, styles.indicaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.indicaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Hazy" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain,
                  mood:'hazy'}
                )} />
              <Button titleStyle={[styles.buttonTitle, styles.indicaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.indicaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Limber Up" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                  {strain: this.props.navigation.state.params.strain,
                  mood:'limber_up'
                  }
                )} />
              <Button titleStyle={[styles.buttonTitle, styles.indicaTitle]}
                buttonStyle={styles.buttonStyle}
                containerStyle={[styles.indicaBtnContainerStyle, styles.buttonContainerStyle]} 
                raised 
                title="Diving" 
                onPress={() => this.props.navigation.navigate('MusicPlayer', 
                {strain: this.props.navigation.state.params.strain,
                mood:'diving'}
                )} />
          </ScrollView>
        )
      }
    }

    return (
        strainContainer(this.props.navigation.state.params)
    );
  }
}

const styles = StyleSheet.create({
  
  // Common Button Styles //
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 16
  },

  buttonContainerStyle: {
    borderRadius: 50,
    borderWidth: 2,
  },

  buttonStyle: {
    height: 80,
    backgroundColor: '#1D1E25',
    borderRadius: 50,
  },

  buttonTitle: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '900'
  },

  // Sativa Button Styles //
  
  sativaBtnContainerStyle: {
    borderColor: '#F79533',
  },

  sativaTitle: {
    color: '#fff',
  },

  // Indica Button Styles //

  indicaBtnContainerStyle: {
    borderColor: '#5073B8',
  },

  indicaTitle: {
    color: '#fff'
  },


});
