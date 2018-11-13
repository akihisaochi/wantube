/* eslint class-methods-use-this: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Container } from 'native-base';
import { View, ScrollView, AsyncStorage } from 'react-native';

import HeaderOrg from '../../containers/organisms/HeaderOrg/';
import NoneFavorite from '../../containers/organisms/NoneFavorite/';
import VideoCards from '../../containers/organisms/VideoCards/';


export default class FavoriteScreen extends Component {
  state = {
    favVideos: [],
  }
  componentDidMount() {
    this.getFavVideos();
    this.props.navigation.addListener('willFocus', () => {
      this.getFavVideos();
    });
  }
  async getFavVideos() {
    const keys = await AsyncStorage.getAllKeys();
    const listData = [];
    let counter = 0;
    const This = this;
    keys.forEach(async function (inKey) {
      const thisVideo = JSON.parse(await AsyncStorage.getItem(inKey));
      thisVideo.videoId = inKey;
      listData.push(thisVideo);
      if (counter === (keys.length - 1)) {
        This.updateFavVideo(listData);
      }
      counter += 1;
    });
  }
  updateFavVideo(favVideos) {
    this.setState({ favVideos });
  }
  delteFavVideFromArray(videoId) {
    const spliceedArray = [...this.state.favVideos];
    spliceedArray.some(function (v, i) {
      if (v.videoId === videoId) {
        spliceedArray.splice(i, 1);
      }
      return false;
    });
    this.updateFavVideo(spliceedArray);
  }

  createFavVideos(favVideosArray) {
    const favVideosJsx = [];
    for (let i = 0; i < favVideosArray.length; i += 1) {
      const isLast = (i === (favVideosArray.length - 1))
        ? (i === (favVideosArray.length - 1))
        : false;
      favVideosJsx.push(<VideoCards
        key={favVideosArray[i].videoId}
        videoId={favVideosArray[i].videoId}
        videoTitle={favVideosArray[i].videoTitle}
        videoDesc={favVideosArray[i].videoDesc}
        thumnailUrl={favVideosArray[i].thumnailUrl}
        navigateFunc={this.props.navigation.navigate}
        removeFunc={() => { this.delteFavVideFromArray(favVideosArray[i].videoId); }}
        isFav
        isLast={isLast}
      />);
    }
    return favVideosJsx;
  }

  render() {
    const favVideos = (this.state.favVideos.length === 0)
      ? <NoneFavorite />
      : (
        <ScrollView ref={(c) => { this._scrollView = c; }} style={{ flex: 1, padding: 15 }}>
          {this.createFavVideos(this.state.favVideos)}
        </ScrollView>
      );
    return (
      <Container style={{ backgroundColor: '#f0f8ff' }}>
        <HeaderOrg
          titleText="お気に入り"
          leftChild={<View />}
          rightChild={<View />}
        />
        {favVideos}
      </Container>
    );
  }
}
