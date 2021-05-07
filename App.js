//import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { RNCamera, FaceDetector } from 'react-native-camera';
import Scanner from "./components/Camera.js"
import database from '@react-native-firebase/database';
import Map from "./components/Maps.js";
import Inputs from "./components/Input.js";

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


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
          title="Go to Camera"
          onPress={() => navigation.navigate('Camera')}
      />


    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Camera" component={Scanner} />
        <Stack.Screen name="Inputs" component={Inputs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
