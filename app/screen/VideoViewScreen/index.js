/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { View, WebView, StyleSheet, Dimensions } from 'react-native';
import { Container, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import HeaderOrg from '../../containers/organisms/HeaderOrg/';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0071BC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  videoInnter: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    padding: 0,
    margin: 0,
  },
});

class VideoViewScreen extends Component {
  render() {
    const videoId = this.props.navigation.getParam('videoId', '2OEWLMg4Tjw');
    const jsCode = `
      const player = document.getElementById('ytplayer').contentWindow;
      const action = 'playVideo';
      player.postMessage('{"event":"command","func":"'+ action +'","args":""}', '*');
    `;
    return (
      <Container>
        <HeaderOrg
          titleText="動画閲覧"
          leftChild={
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon type="font-awesome" name="arrow-left" color="#0071BC" />
            </Button>
          }
          rightChild={<View />}
        />
        <View style={styles.container}>
          <WebView
            source={{
              html: `
                <style>
                  html,body { padding: 0; margin: 0; }
                </style>
                <iframe
                  id="ytplayer"
                  type="text/html"
                  style="width: 100vw; height: 100vh;"
                  src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1"
                  frameborder="0"
                  allowfullscreen
                />
              `,
            }}
            style={styles.videoInnter}
            scalesPageToFit
            javaScriptEnabled
            startInLoadingState
            javaScriptEnabledAndroid
            injectedJavaScript={jsCode}
            allowsInlineMediaPlayback
            allowUniversalAccessFromFileURLs
            automaticallyAdjustContentInsets
          />
        </View>
      </Container>
    );
  }
}
export default VideoViewScreen;
