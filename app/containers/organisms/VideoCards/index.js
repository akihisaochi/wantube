/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import { Card } from 'native-base';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import showToast from '../../../util/ToastService';

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
  },
  videoWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    height: 250,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTumnailWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  videoTumnailImage: {
    flex: 1,
  },
  videoTumnailHidden: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  videoInnter: {
    flex: 1,
  },
  descWrapper: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  videoDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
  playTrigger: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, .2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  favTrigger: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

export default class VideoCards extends Component {
  state = {
    isFavorite: this.props.isFav,
  };

  handleViewRef = (ref) => { this.view = ref; };

  rubberBand() {
    this.view.rubberBand(800);
  }
  toggleFavoriteFlag() {
    const nowFlag = this.state.isFavorite;
    this.setState({ isFavorite: !nowFlag });
    this.rubberBand();
    const toastMessage = (!nowFlag) ? 'お気に入りに登録しました。' : 'お気に入りを解除しました。';
    showToast(toastMessage);
    if (!nowFlag) {
      this.saveKey(this.props.videoId, JSON.stringify({
        videoTitle: this.props.videoTitle,
        videoDesc: this.props.videoDesc,
        thumnailUrl: this.props.thumnailUrl,
      }));
    } else {
      AsyncStorage.removeItem(this.props.videoId, () => {
        this.props.removeFunc();
      });
    }
  }
  async saveKey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`Error saving data${error}`);
    }
  }
  videoView() {
    this.props.navigateFunc('VideoView', { videoId: this.props.videoId });
  }
  render() {
    const lastChildStyle = (this.props.isLast) ? { marginBottom: 30 } : { marginBottom: 0 };
    return (
      <Card style={[styles.cardWrapper, lastChildStyle]}>
        <View style={styles.videoWrapper}>
          <View style={styles.videoTumnailWrapper}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.videoView(); }}>
              <Image style={styles.videoTumnailImage} source={{ uri: this.props.thumnailUrl }} />
            </TouchableOpacity>
          </View>
          <View style={styles.playTrigger} pointerEvents="none">
            <Icon size={24} color="#fff" type="font-awesome" name="play" />
          </View>
          <TouchableWithoutFeedback onPress={() => this.toggleFavoriteFlag()}>
            <Animatable.View ref={this.handleViewRef} style={styles.favTrigger}>
              <Icon size={24} color={(this.state.isFavorite) ? '#ff2a6b' : '#888888'} type="font-awesome" name="heart" />
            </Animatable.View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.descWrapper}>
          <Text style={styles.videoTitle}>{ this.props.videoTitle }</Text>
          <Text style={styles.videoDesc}>{this.props.videoDesc}</Text>
          <Text>{this.state.name}</Text>
        </View>
      </Card>
    );
  }
}
VideoCards.propTypes = {
  videoId: PropTypes.string.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoDesc: PropTypes.string.isRequired,
  thumnailUrl: PropTypes.string.isRequired,
  navigateFunc: PropTypes.func.isRequired,
  removeFunc: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
};
