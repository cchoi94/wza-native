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
      data: [],
      selectedTrack: {},
      tracksArray: null,
      trackNumber: null,
      mediaIsPlaying: false,
      mediaTrackProgressDuration: "0:00",
      mediaTrackPlayableDuration: "-:--",
      mediaTagged: false,
      repeatOnBack: false
    }

    // this.mediaOnLoad = this.mediaOnLoad.bind(this)
    // this.onToggleMediaPlay = this.onToggleMediaPlay.bind(this)
  }

  mediaProgress = (trackProgressInfo) => {
    if (trackProgressInfo) {
      const currentDuration = this.minTommss(trackProgressInfo.currentTime/60)
      this.setState({
        mediaTrackProgressDuration: currentDuration
      })
      if (trackProgressInfo.currentTime/60 > 1 && !this.state.mediaTagged) {
        this.setState({
          mediaTagged : false
        })
        //tag song link PUT
      }
      if (trackProgressInfo.currentTime > 1) {

      console.log(trackProgressInfo.currentTime)
        
        this.setState({
          repeatOnBack: true
        })
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

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getRandomTrackArray = () => {
    // let playedTrackNumbers = this.state.playedTrackNumbers
    
    // let randomTrackNumber = Math.floor(Math.random() * Math.floor(this.state.data.playlist.length - 1))

    if (!this.state.tracksArray || this.state.trackNumber === this.state.tracksArray.length - 1) {
      let tracksArray = Array.apply(null, {length: (this.state.data.playlist.length)}).map(Number.call, Number)

      this.shuffle(tracksArray)

      this.setState({
        tracksArray
      }, () => {this.fetchSong()})
    } else {
      this.fetchSong()
    }


    // if (playedTrackNumbers.includes(randomTrackNumber)) {
    //   this.getRandomTrackArray()
    // } else {
      // playedTrackNumbers.push(randomTrackNumber)
      // this.setState({
      //   playedTrackNumbers
      // })
    //   return randomTrackNumber
    // }
  }

  fetchSong = () => {

    let trackNumber = 0
    if (this.state.trackNumber || this.state.trackNumber === 0) {
      trackNumber = this.state.trackNumber + 1
    }

    let selectedTrack = this.state.data.playlist[this.state.tracksArray[trackNumber]]

    if (trackNumber === this.state.tracksArray.length) {
      this.setState({
        trackNumber: null,
        tracksArray: null
      })
      this.prepTrack()
    } else {
      this.setState({
        selectedTrack,
        trackNumber,
        mediaTrackProgressDuration: "0:00"
      })
    }
  }

  getSongData = (ref) => {
    firebase.database().ref(ref).once('value', (snapshot) => {
        this.setState({
          data: snapshot.val()
        }, () => {
          if (this.state.data) {
            Object.values(this.state.data).forEach(artist => {
              if (artist.is_live) {
                this.setState({
                  data: artist
                }, this.getRandomTrackArray)
              }
            })
          }
        })
      });
  }

  onBackBtn = () => {
    if (this.state.repeatOnBack || this.state.trackNumber === 0) {

    this.player.seek(0)

    this.setState({
      repeatOnBack: false
    })

    } else {
      let trackNumber = 0
      
      trackNumber = this.state.trackNumber - 1

      let selectedTrack = this.state.data.playlist[this.state.tracksArray[trackNumber]]

      this.setState({
        selectedTrack,
        repeatOnBack: false,
        trackNumber,
        mediaTrackProgressDuration: "0:00"
      })
    }
  }

  prepTrack = () => {
    this.setState({
      mediaTrackProgressDuration: "0:00"
    }, () => {
      if (this.props.navigation.state.params.artist_of_the_week) {
        this.getSongData('/aow')
      }
    })
  }

  componentDidMount() {
    this.prepTrack()
  }

  render () {
    const {selectedTrack} = this.state
    return (
      <ScrollView contentContainerStyle={styles.mediaContainer}>
        <Text style={styles.mediaTitle}>
          {selectedTrack.title}
        </Text>
        <Text style={styles.mediaArtist}>
          {selectedTrack.artist}
        </Text>
        {this.state.mediaIsPlaying ?
          <View style={styles.mediaPlayerControls}>
            <TouchableOpacity style={styles.mediaForwardBtn} onPress = {() => this.onBackBtn()}>
                <Image
                  style={{width: 50, height: 50}}
                  source={this.props.navigation.state.params.strain === 'sativa' ?
                    require('../assets/warmBackBtn.png') : require('../assets/coldBackBtn.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaPlayBtn} onPress={() => this.onToggleMediaPlay()}>
              <Image
                style={{width: 100, height: 100}}
                source={this.props.navigation.state.params.strain === 'sativa' ? 
                  require('../assets/warmPauseBtn.png') :  require('../assets/coldPauseBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaForwardBtn} onPress = {() => this.fetchSong()}>
                <Image
                  style={{width: 50, height: 50}}
                  source={this.props.navigation.state.params.strain === 'sativa' ?
                    require('../assets/warmForwardBtn.png') : require('../assets/coldForwardBtn.png')}
                />
              </TouchableOpacity>
          </View>
        :
          <View style={styles.mediaPlayerControls}>
            <TouchableOpacity style={styles.mediaForwardBtn} onPress = {() => this.onBackBtn()}>
                  <Image
                    style={{width: 50, height: 50}}
                    source={this.props.navigation.state.params.strain === 'sativa' ?
                      require('../assets/warmBackBtn.png') : require('../assets/coldBackBtn.png')}
                  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaPlayBtn} onPress={() => this.onToggleMediaPlay()}>
              <Image
                style={{width: 100, height: 100}}
                source={this.props.navigation.state.params.strain === 'sativa' ? 
                  require('../assets/warmPlayBtn.png') : require('../assets/coldPlayBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaForwardBtn} onPress = {() => this.fetchSong()}>
              <Image
                style={{width: 50, height: 50}}
                source={this.props.navigation.state.params.strain === 'sativa' ?
                  require('../assets/warmForwardBtn.png') : require('../assets/coldForwardBtn.png')}
              />
            </TouchableOpacity>
          </View>
        }
        <Text style={styles.mediaDuration}>{this.state.mediaTrackProgressDuration} / {this.state.mediaTrackPlayableDuration !== 0 && this.state.mediaTrackPlayableDuration}</Text> 

      <Video source={{uri: selectedTrack.url }} 
        ref={(ref) => {
         this.player = ref
        }}  
        volume={1.0}
        muted={false}
        repeat={true}
        paused={!this.state.mediaIsPlaying}
        onProgress={this.mediaProgress}
        ignoreSilentSwitch="ignore"
        onSeek={this.onSeek}
        allowsExternalPlayback={true}
        playInBackground={true}
        playWhenInactive={true} 
        onError={this.videoError}               
        // style={styles.backgroundVideo}
        onEnd={this.fetchSong}
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
  },
  mediaTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 8,
  },
  mediaArtist: {
    fontSize: 24,
    color: '#fff',
    color: '#D9BC7B'
  },
  mediaPlayBtn: {
    marginRight: 40,
    marginLeft: 40
  },
  mediaForwardBtn: {
  },
  mediaDuration: {
    fontSize: 24,
    color: '#fff'
  }

});