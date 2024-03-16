import React from 'react';

import { StyleSheet, Text, View, ViewProps } from 'react-native';

interface ShadowProps extends ViewProps {
  title?: string;
}

export default function Shadow({ children, title }: ShadowProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.shadow}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 24,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#34495E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#37474F',
    marginBottom: 24,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 5,
  },
});
