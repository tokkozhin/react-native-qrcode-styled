import React, { useRef } from 'react';

import { StyleSheet, View, Pressable, Text } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';
import type { Svg } from 'react-native-svg';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function DownloadQR() {
  const ref = useRef<Svg>(null);

  const handlePressDownload = () => {
    ref.current?.toDataURL(async (base64Code) => {
      const filename = FileSystem.documentDirectory + 'qr_code.png';

      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await MediaLibrary.saveToLibraryAsync(filename);
    });
  };

  return (
    <View style={styles.root}>
      <QRCodeStyled ref={ref} data={'Download QR'} padding={25} pieceSize={8} />

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
