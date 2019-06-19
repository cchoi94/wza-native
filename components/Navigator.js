import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  MusicPlayer: {screen: MusicPlayer},
});

const Navigator = createAppContainer(MainNavigator);

export default Navigator;