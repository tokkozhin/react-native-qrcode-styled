import React, { useRef } from 'react';

import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import QRCodeStyled, { SVGGradient, SVGQRCodeStyledProps } from 'react-native-qrcode-styled';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Defs, Rect } from 'react-native-svg';
// also need to add MEDIA_LIBRARY permission for android
// https://docs.expo.dev/versions/latest/sdk/media-library/#configuration-in-appjsonappconfigjs

export default function DownloadQR() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const QRRef = useRef<any>(null);

  const handlePressDownload = async () => {
    try {
      let isPermissionGranted = permissionResponse?.granted;
      if (!isPermissionGranted) {
        isPermissionGranted = (await requestPermission()).granted;
      }

      if (!isPermissionGranted) {
        throw new Error('Library permission access denied');
      }

      QRRef.current?.toDataURL(async (base64Code: string) => {
        const filename = FileSystem.documentDirectory + 'qr_code.png';

        await FileSystem.writeAsStringAsync(filename, base64Code, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await MediaLibrary.saveToLibraryAsync(filename);
        Alert.alert('QR downloaded!');
      });
    } catch (error) {
      console.error('QR downloading failed: ', error);
    }
  };

  const renderBackground: SVGQRCodeStyledProps['renderBackground'] = (pieceSize, matrix) => {
    const size = matrix.length * pieceSize + 50;

    return (
      <>
        <Defs>
          <SVGGradient
            id="bgGradient"
            origin={[0, 0]}
            size={size}
            type={'linear'}
            options={{
              colors: ['#01fff2', '#b634e6'],
              start: [-0.3, -0.3],
              end: [0.7, 0.7],
            }}
          />
        </Defs>

        <Rect x={-25} y={-25} width={size} height={size} fill={'url(#bgGradient)'} />
      </>
    );
  };

  return (
    <View style={styles.root}>
      <QRCodeStyled
        ref={QRRef}
        data={'Download QR'}
        padding={25}
        pieceSize={8}
        color={'white'}
        renderBackground={renderBackground}
      />

      <Pressable
        onPress={handlePressDownload}
        style={({ pressed }) => [styles.button, { backgroundColor: pressed ? 'grey' : 'black' }]}
      >
        <Text style={styles.buttonText}>download</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderRadius: 8,
  },
});
