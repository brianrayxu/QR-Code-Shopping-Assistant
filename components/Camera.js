import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { RNCamera } from "react-native-camera";
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: "",
      latitude: null,
      longitude: null,
      error: null,
    };
  }

      createTwoButtonAlert = () =>
              Alert.alert(
                  "QRcode sensed",
                  "Would you like to save?",
                  [
                      {text: "Cancel",
                      onPress: () => Alert.alert("Cancel Pressed"),
                      style: "cancel",},

                      {text: "Save",
                      onPress: () => this.props.navigation.navigate('Inputs', { QRcode: this.state.qrcode }),
                      style: "cancel",}
                  ]
              );


  onBarCodeRead = e => {
    this.setState({ qrcode: e.data });
    this.createTwoButtonAlert();
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            aspect={1}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}
        >
          <Text
            style={{
              backgroundColor: "white"
            }}
          >
            {this.state.qrcode}
          </Text>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default Scanner;
