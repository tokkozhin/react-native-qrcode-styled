import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import Shadow from './Shadow';
import CustomPieces from './examples/CustomPieces';
import CirclePieces from './examples/CirclePieces';
import GluedRoundedPieces from './examples/GluedRoundedPieces';
import LiquidPieces from './examples/LiquidPieces';
import CutCornersPieces from './examples/CutCornersPieces';
import RainStyle from './examples/RainStyle';
import LinearGradient from './examples/LinearGradient';
import CustomEyes from './examples/CustomEyes';
import WithLogo from './examples/WithLogo';
import WithBackgroundImage from './examples/WithBackgroundImage';
import CustomPiecesAndEyes from './examples/CustomPiecesAndEyes';
import DownloadQR from './examples/DownloadQR';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.root}>
      <Shadow title="Circle Pieces">
        <CirclePieces />
      </Shadow>

      <Shadow title="Glued Rounded Pieces">
        <GluedRoundedPieces />
      </Shadow>

      <Shadow title="Liquid Pieces">
        <LiquidPieces />
      </Shadow>

      <Shadow title="Cut Corners Pieces">
        <CutCornersPieces />
      </Shadow>

      <Shadow title="Rain Style">
        <RainStyle />
      </Shadow>

      <Shadow title="Linear Gradient">
        <LinearGradient />
      </Shadow>

      <Shadow title="Custom Eyes">
        <CustomEyes />
      </Shadow>

      <Shadow title="QR with logo">
        <WithLogo />
      </Shadow>

      <Shadow title="QR with background">
        <WithBackgroundImage />
      </Shadow>

      <Shadow title="Custom Pieces">
        <CustomPieces />
      </Shadow>

      <Shadow title="Custom Pieces & Eyes">
        <CustomPiecesAndEyes />
      </Shadow>

      <Shadow title="Download QR">
        <DownloadQR />
      </Shadow>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ECEFF1',
  },
  container: {
    paddingVertical: 80,
    alignItems: 'center',
  },
});
