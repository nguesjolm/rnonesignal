import { useState, useEffect, useRef } from 'react';
import { StyleSheet,Text, View,PermissionsAndroid,StatusBar,Linking} from 'react-native';
import * as React from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from "react-native-splash-screen";

//Import onesignal package
import OneSignal from 'react-native-onesignal';



export default function App() {

    const [immourl,setImmourl] = useState("https://immover.io");
  
    useEffect(() => { 
	 //hides the splash screen on app load.
	  SplashScreen.hide(); 
	 //Ask user permission
	 const permis = async () => {
		const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS );
	 };
	 permis();
	 //Onesignal Id apps
	 OneSignal.setAppId("4aa2156e-9ef8-4b24-8759-d2b97e536a0a");
	 //Method for handling notifications opened
	 OneSignal.setNotificationOpenedHandler(notification => {
	     console.log("OneSignal: notification opened:", notification);
	  });
	  //Charge link in push notification
	  OneSignal.setNotificationOpenedHandler(openedEvent => {
		const { notification } = openedEvent
	    console.log({notification});
		if (notification.launchURL !== "") {
		  setImmourl(notification.launchURL ?? "https://immover.io" );	
		}
	   });

    },[])

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#f4390f"
      />
    
      <View style={styles.topBar}>
        <Text style={{color:'white',fontSize:20,marginLeft:10,marginTop:2,fontWeight:"bold"}}>ImmOver</Text>
      </View>
      <WebView style={styles.webview}  source={{ uri: immourl }}/>

    </View>
  );

 
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ecf0f1",
		flexDirection: "column",
	},

	topBar: {
		height: '5%',
		width: "100%",
		//justifyContent: "center",
		//alignItems: "center",
		backgroundColor: "#f4390f",
	},
	webview: {
		height: 300,
	},
});