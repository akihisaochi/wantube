import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {
  Button,
  Body,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  Input,
  InputGroup,
} from 'native-base';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  settingExplain: {
    borderColor: '#eee',
    borderBottomWidth: 1,
  },
  colorBlue: {
    color: '#0071BC',
  },
  colorWhite: {
    color: '#fff',
  },
  explainHeader: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  explainDescription: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
  settingInput: {
    fontSize: 16,
    paddingLeft: 0,
    width: '92%',
  },
  settingInputGroup: {
    paddingRight: 5,
  },
  excludeText: {
    paddingLeft: 10,
    backgroundColor: '#fefefe',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

export default class SearchSetting extends Component {
  state = {
    addText: '',
    listViewData: [],
  }
  addRow() {
    const { addText } = this.state;
    if (addText === '') return;
    const updateData = [...this.state.listViewData];
    let sameFlag = false;
    for (let i = 0; i < updateData.length; i += 1) {
      if (addText === updateData[i]) sameFlag = true;
    }
    if (sameFlag) {
      Alert.alert(
        'お知らせ',
        `『${addText}』は既に存在します`,
        [
          { text: 'OK', onPress: () => {} },
        ],
      );
      return;
    }
    updateData.push(addText);
    this.setState({
      listViewData: updateData,
      addText: '',
    });
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  handleAddTextChange(e) {
    e.preventDefault();
    this.setState({
      addText: e.nativeEvent.text,
    });
  }
  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const lists = (this.state.listViewData.length > 0)
      ?
      (
        <Card>
          <List
            dataSource={ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              (
                <ListItem style={styles.excludeText}>
                  <Text> {data} </Text>
                </ListItem>
              )
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              (
                <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon type="font-awesome" name="trash" color="#fff" />
                </Button>
              )
            }
            rightOpenValue={-75}
            disableRightSwipe
          />
        </Card>
      )
      : <View />;
    return (
      <View>
        <Card>
          <CardItem header style={styles.settingExplain}>
            <Body>
              <View>
                <Text style={[styles.explainHeader, styles.colorBlue]}>除外テキスト</Text>
                <Text style={[styles.explainDescription, styles.colorBlue]}>
                  (除外テキストが含まれる動画を検索結果から外します)
                </Text>
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <InputGroup style={styles.settingInputGroup}>
              <Input
                style={styles.settingInput}
                onChange={(e) => { this.handleAddTextChange(e); }}
                placeholder="入力後、右のボタンを押してください"
                blurOnSubmit
                onSubmitEditing={() => this.addRow()}
                value={this.state.addText}
              />
              <Button transparent onPress={() => this.addRow()}>
                <Icon type="font-awesome" name="plus-circle" color={(this.state.addText === '') ? '#888' : '#ff6135'} />
              </Button>
            </InputGroup>
          </CardItem>
        </Card>
        {lists}
      </View>
    );
  }
}
