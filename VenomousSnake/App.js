import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import firebase from './firebaseConfig'

const App = ()=> {

  const uploadSingleImageFromGallery = ()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      includeExif: true
    }).then(image => {
      //console.log(image)
      const formData = new FormData();
      let imageData = {
        uri: image.path,
        name:'userImage',
        type:'image/*'
      };
      const storageRef = firebase.storage().ref('userImage/test.jpg');
      storageRef.put(image.path).then(()=>{
        console.log('upload success');
      }).catch((err)=>{
        console.log(err);
        throw err;
      });
      // formData.append('userImage', imageData, 'snakeExample')
      // let url = 'https://venomoussnake-303614.et.r.appspot.com/upload'
      // axios.post(url, formData, { 
      //   headers:{
      //       'Content-Type': 'multipart/form-data'
      //   }
      // }).then((response)=>{
      //   console.log(response.data);
      // }).catch((error)=>{
      //     throw error;
      // })
    });
  }

  const uploadSingleImageFromCamera = ()=>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          title="upload single image from gallery"
          onPress={uploadSingleImageFromGallery}
        />
        <Button
          title="upload single image from camera"
          onPress={uploadSingleImageFromCamera}
          color='red'
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
