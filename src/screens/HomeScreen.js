import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Linking,
  AppState,
  Button,
  TouchableOpacity
} from "react-native";
import { IntentLauncherAndroid } from "expo";
import * as Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import Modal from "react-native-modal";

const LOCATION_TASK_NAME = "background-location-task";
const LOCATION_STOP_TASK_NAME = "background-location-stop-task";

class HomeScreen extends React.Component {
  timeout = 0;

  state = {
    location: null,
    errorMessage: null,
    isLocationModalVisible: false,
    appState: AppState.currentState
  };

  componentWillUnmount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      this.timeout = setInterval(async () => {
        // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //   accuracy: Location.Accuracy.Balanced
        // });
        this._getLocationAsync();
      }, 5000);
    }
    this.setState({ appState: nextAppState });
  };

  componentWillMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    // if (Platform.OS === "android" && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage:
    //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
    //   });
    // } else {
    //   this._getLocationAsync();
    // }
    this.timeout = setInterval(async () => {
      // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //   accuracy: Location.Accuracy.Balanced
      // });
      this._getLocationAsync();
    }, 5000);
  }

  // onPress = async () => {
  //   // await Location.hasServicesEnabledAsync().then(res => {
  //   //   if (res) {
  //   //     console.log("test online");
  //   //   } else {
  //   //     console.log("test offline");
  //   //     this.getLocationPermission();
  //   //   }
  //   // });
  //   // this.timeout = setInterval(async () => {
  //   //   await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  //   //     accuracy: Location.Accuracy.Balanced
  //   //   });
  //   // }, 5000);
  //   await Location.enableNetworkProviderAsync().then(res => {
  //     console.log(res);
  //   });
  // };

  onPressStop = async () => {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      .catch(err => console.log(err))
      .then(console.log("Location STOP"));
    clearInterval(this.timeout);
  };

  _getLocationAsync = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
        return;
      }

      //let location = await Location.getCurrentPositionAsync({});
      let location = await Location.startLocationUpdatesAsync(
        LOCATION_TASK_NAME,
        {
          accuracy: Location.Accuracy.Balanced
        }
      );

      //this.setState({ location });
    } catch (error) {
      let status = Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        this.setState({ isLocationModalVisible: true });
      }
    }
  };

  // openSetting = () => {
  //   if (Platform.OS == "ios") {
  //     Linking.openURL("app-settings:");
  //   } else {
  //     IntentLauncherAndroid.startActivityAsync(
  //       IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
  //     );
  //   }
  //   this.setState({ openSetting: false });
  // };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
        <Modal
          onModalHide={this.state.openSetting ? this.openSetting : undefined}
          isVisible={this.state.isLocationModalVisible}
        >
          <View
            style={{
              height: 300,
              width: 300,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              onPress={() =>
                this.setState({
                  isLocationModalVisible: false,
                  openSetting: true
                })
              }
              title="Enable Location Services"
            />
          </View>
        </Modal>
        <Text style={styles.paragraph}>{text}</Text>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "green" }}
          onPress={this.onPress}
        >
          <Text>Update Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "red" }}
          onPress={this.onPressStop}
        >
          <Text>Stop Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
    // alert(JSON.stringify(locations));
  }
});

export default HomeScreen;
