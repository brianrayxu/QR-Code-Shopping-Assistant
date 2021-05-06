import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: ""
    };
  }

  onBarCodeRead = e => {
    this.setState({ qrcode: e.data });
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
