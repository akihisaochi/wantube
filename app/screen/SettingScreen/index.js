/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import HeaderOrg from '../../containers/organisms/HeaderOrg/';
import SearchSetting from '../../containers/organisms/SearchSetting/';

export default class SettingScreen extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#f0f8ff' }}>
        <HeaderOrg
          titleText="検索設定"
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
        <Content padder>
          <SearchSetting />
        </Content>
      </Container>
    );
  }
}
