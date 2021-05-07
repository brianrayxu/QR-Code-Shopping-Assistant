import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';

var markerstemp = []
database()
  .ref()
  .once('value')
  .then(snapshot => {
    snapshot.forEach(function(item){
        var itemVal = item.val();
        markerstemp.push(itemVal);
    });

    console.log('markerstemp: ', markerstemp);
  });

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

class Map extends Component {
  constructor(props) {
    super(props);
    findCoordinates = () => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const location = JSON.stringify(position);

                        this.setState({ location });
                        console.log(this.location)
                    },
                    error => Alert.alert(error.message),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            };
    this.state = {
      markers: markerstemp
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <MapView
                     provider={PROVIDER_GOOGLE}
                     style={styles.map}
                     region={{
                             latitude: 37,
                             longitude: -122,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                     }}
                   >
                   {this.state.markers.map((marker, index) => (
                       <MapView.Marker
                         key = {index}
                         coordinate={marker.coordinate}
                         title={marker.title}
                       />
                     ))}
        </MapView>
      </View>
    );
  }
}

export default Map;
