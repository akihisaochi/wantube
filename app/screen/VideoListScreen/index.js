/* eslint react/prop-types: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0 */
import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage } from 'react-native';
import { Container, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import HeaderOrg from '../../containers/organisms/HeaderOrg/';
import VideoCards from '../../containers/organisms/VideoCards/';
import LoadingContainer from '../../containers/organisms/LoadingContainer';

import searchYoutube from '../../util/youtubeSearch';

export default class VideoListScreen extends Component {
  state = {
    videos: '',
    favVideoIds: [],
  }
  componentDidMount() {
    this.updateVideoList();
    this.getFavVideos();
    this.props.navigation.addListener('didFocus', (e) => {
      if (e.action.type !== 'Navigation/BACK' && e.action.type !== 'Navigation/COMPLETE_TRANSITION' && e.lastState !== null) {
        this.updateVideoList();
        this.getFavVideos();
      }
    });
  }
  componentWillUnmount() {
    this.setState({ favVideoIds: [] });
    this.getFavVideos();
  }
  async getFavVideos() {
    const keys = await AsyncStorage.getAllKeys();
    this.updateFavVideoIds(keys);
  }
  updateFavVideoIds(favVideoIds) {
    this.setState({ favVideoIds });
    this.forceUpdate();
  }
  delteFavVideFromArray(videoId) {
    const spliceedArray = [...this.state.favVideoIds];
    spliceedArray.some(function (v, i) {
      if (v.videoId === videoId) {
        spliceedArray.splice(i, 1);
      }
      return false;
    });
    this.updateFavVideoIds(spliceedArray);
  }
  updateVideoList() {
    this.setState({ videos: '' });
    const dogCharArray = ['dog', '犬', 'わんこ', 'いぬ'];
    const thisDogChar = dogCharArray[Math.floor(Math.random() * dogCharArray.length)];
    searchYoutube(thisDogChar, (videos) => {
      this.setState({ videos });
      this.contentScrollTop();
    });
  }
  contentScrollTop() {
    this._scrollView.scrollTo({ x: 0, y: 0, animated: false });
  }
  render() {
    let videosWrapper = <View style={{ flex: 1 }}><LoadingContainer /></View>;
    if (this.state.videos !== '') {
      const videos = [];
      for (let i = 0; i < this.state.videos.length; i += 1) {
        const isLast = (i === (this.state.videos.length - 1))
          ? (i === (this.state.videos.length - 1))
          : false;
        const thisVideo = this.state.videos[i];
        videos.push(<VideoCards
          key={thisVideo.id.videoId}
          videoId={thisVideo.id.videoId}
          videoTitle={thisVideo.snippet.title}
          videoDesc={thisVideo.snippet.description}
          thumnailUrl={thisVideo.snippet.thumbnails.medium.url}
          navigateFunc={this.props.navigation.navigate}
          removeFunc={() => { this.delteFavVideFromArray(thisVideo.id.videoId); }}
          isFav={(this.state.favVideoIds.indexOf(thisVideo.id.videoId) >= 0)}
          isLast={isLast}
        />);
      }
      videosWrapper = (
        <ScrollView
          ref={(c) => { this._scrollView = c; }}
          style={{ flex: 1, padding: 15 }}
        >
          {videos}
        </ScrollView>
      );
    }
    return (
      <Container style={{ backgroundColor: '#f0f8ff' }}>
        <HeaderOrg
          titleText="動画一覧"
          leftChild={<View />}
          rightChild={
            <Button
              transparent
              onPress={() => this.updateVideoList()}
            >
              <Icon
                name="refresh"
                color="#0071bc"
              />
            </Button>
          }
        />
        {videosWrapper}
      </Container>
    );
  }
}
