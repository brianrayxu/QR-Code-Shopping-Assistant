import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';

//const newReference = database()
//  .ref()
//  .push();
//
//console.log('Auto generated key: ', newReference.key);
//
//newReference
//  .set({
//    title: "TestWrite",
//    QRcode: "TestWrite",
//    coordinate: {latitude: 37, longitude: -122},
//  })
//  .then(() => console.log('Data updated.'));

class Inputs extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         qrcode: "",
//         latitude: null,
//         longitude: null,
//         error: null,
//       };
//     }


   state = {
      qrcode: JSON.stringify(this.props.route.params),
      title: '',
      latitude: null,
      longitude: null,
   };


  // this.state.qrcode = route.params
   handleTitle = (text) => {
      this.setState({ title: text })
   }



   done = async () => {
      //console.log(this.props.route.params)
      alert('Added to My places!' + this.state.title)
      // database
      var newReference = database()
        .ref()
        .push();
        console.log("Starting findCoordinates")
                   const position = await Geolocation.getCurrentPosition()
                   let latitude = position.coords.latitude;
                   let longitude = position.coords.longitude;
                   console.log("latitude2: " + latitude)

      console.log('Auto generated key: ', newReference.key);
      //console.log("Latitude:" + this.state.latitude)
      newReference
        .set({
          title: this.state.title,
          QRcode: this.state.qrcode,
          coordinate: {latitude: 37, longitude: -122},
        })
        .then(() => console.log('Data updated.'));
      // back to root
   }
   render() {
   const { route } = this.props
   const { qrcode } = route.params
   //console.log("qrcode: " + qrcode )
      return (
         <View style = {styles.container}>
            <Text>Name your Tracker for: {this.state.qrcode}</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Title"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleTitle}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.done()
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})
