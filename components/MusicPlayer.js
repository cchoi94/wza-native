import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import Video from 'react-native-video';
import firebase from 'react-native-firebase';

export default class MusicPlayer extends Component {

  static navigationOptions = {
    title: 'Wza Player',
    headerStyle: {
      backgroundColor: '#1D1E25',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      mediaIsPlaying: false,
      mediaTrackProgressDuration: "0:00",
      mediaTrackPlayableDuration: "-:--",
      mediaTagged: false
    }

    // this.mediaOnLoad = this.mediaOnLoad.bind(this)
    // this.onToggleMediaPlay = this.onToggleMediaPlay.bind(this)
  }

  mediaProgress = (trackProgressInfo) => {
    console.log(trackProgressInfo)
    if (trackProgressInfo) {
      const currentDuration = this.minTommss(trackProgressInfo.currentTime/60)
      this.setState({
        mediaTrackProgressDuration: currentDuration
      })
      console.log(trackProgressInfo.currentTime/60)
      if (trackProgressInfo.currentTime/60 > 1 && !this.state.mediaTagged) {
        this.setState({
          mediaTagged : false
        })
        //tag song link PUT
      }
    }
  }


  mediaOnLoad = (trackLoadInfo) => {
    const trackDuration = this.minTommss(trackLoadInfo.duration/60)
      this.setState({
        mediaIsPlaying: true,
        mediaTrackPlayableDuration: trackDuration
      })
    }

  onToggleMediaPlay = () => {
    this.setState({
      mediaIsPlaying: !this.state.mediaIsPlaying
    })
  }

  minTommss = (minutes) => {
    const sign = minutes < 0 ? "-" : "";
    const min = Math.floor(Math.abs(minutes));
    const sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + min + ":" + (sec < 10 ? "0" : "") + sec;
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params)
    // if strain and feeling grab this, if aow grab that
    //file structure
    //strain:{feelings:{songList}}
    //artistOfTheWeek:{songlist}
    firebase.auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log('default app user ->', credential.user.toJSON());
    }
  });
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>
          Music Title
        </Text>
        {this.state.mediaIsPlaying ?
          <View style={styles.mediaPlayerControls}>
            <TouchableOpacity style={styles.mediaPlayBtn} onPress={() => this.onToggleMediaPlay()}>
              <Image
                style={{width: 100, height: 100}}
                source={this.props.navigation.state.params.strain === 'sativa' ? 
                  require('../assets/warmPauseBtn.png') :  require('../assets/coldPauseBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaPauseBtn}>
                <Image
                  style={{width: 50, height: 50}}
                  source={this.props.navigation.state.params.strain === 'sativa' ?
                    require('../assets/warmForwardBtn.png') : require('../assets/coldForwardBtn.png')}
                />
              </TouchableOpacity>
          </View>
        :
          <View style={styles.mediaPlayerControls}>
            <TouchableOpacity style={styles.mediaPlayBtn} onPress={() => this.onToggleMediaPlay()}>
              <Image
                style={{width: 100, height: 100}}
                source={this.props.navigation.state.params.strain === 'sativa' ? 
                  require('../assets/warmPlayBtn.png') : require('../assets/coldPlayBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaPauseBtn}>
              <Image
                style={{width: 50, height: 50}}
                source={this.props.navigation.state.params.strain === 'sativa' ?
                  require('../assets/warmForwardBtn.png') : require('../assets/coldForwardBtn.png')}
              />
            </TouchableOpacity>
          </View>
        }
        <Text style={styles.mediaDuration}>{this.state.mediaTrackProgressDuration} / {this.state.mediaTrackPlayableDuration !== 0 && this.state.mediaTrackPlayableDuration}</Text> 

      <Video source={{uri: 'https://firebasestorage.googleapis.com/v0/b/wza-backend.appspot.com/o/%EF%BC%A8%EF%BC%A9%EF%BC%A7%EF%BC%A8%E3%80%80%EF%BC%A1%EF%BC%B4%E3%80%80%EF%BC%B7%EF%BC%AF%EF%BC%B2%EF%BC%AB%203.mp3?alt=media&token=a2941150-9175-4a1f-a3dd-12a18c2f535c' }} 
        ref="audio"
        volume={1.0}
        muted={false}
        repeat={true}
        paused={!this.state.mediaIsPlaying}
        onProgress={this.mediaProgress}
        playInBackground={true}
        playWhenInactive={true} 
        onError={this.videoError}               
        // style={styles.backgroundVideo}
        onLoad={this.mediaOnLoad} />
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 120,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mediaPlayerControls: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    position:'relative',
    left: 45
  },
  mediaTitle: {
    fontSize: 24,
    color: '#fff'
  },
  mediaPlayBtn: {
    marginRight: 40
  },
  mediaPauseBtn: {
  },
  mediaDuration: {
    fontSize: 24,
    color: '#fff'
  }

});