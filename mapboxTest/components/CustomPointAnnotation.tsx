import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import MapboxGL from "@rnmapbox/maps";

const CustomPointAnnotation = ({
  id,
  coordinate,
  title,
  count,
  imageUrl,
  eventColor,
  totalCount,
  onPressMarker,
}) => {
  // Normalize the value between 0 and 1 for shadowOpacity
  const shadowOpacity = Math.round((count / totalCount) * 10) / 10;

  // Normalize the value for shadowRadius (e.g., 0 to 30)
  const shadowRadius = Math.round((count / totalCount) * 30);

  // Normalize the value for elevation (e.g., 0 to 20)
  const elevation = (count / totalCount) * 20;
  return (
    <MapboxGL.MarkerView
      id={id}
      coordinate={coordinate}
      style={{
        shadowOffset: { width: 0, height: 1 },
        shadowColor: eventColor,
        shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
        elevation: elevation,
        shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
      }}
    >
      <Pressable style={styles.annotationContainer} onPress={onPressMarker}>
        <View style={[styles.bubble, { borderColor: eventColor }]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.markerText}>{count}</Text>
        </View>
        <View
          style={[
            styles.pulse,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse1,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse2,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse3,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse3,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity === 0 ? 0.1 : shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius < 5 ? 5 : shadowRadius,
            },
          ]}
        />
      </Pressable>
    </MapboxGL.MarkerView>
  );
};

const styles = StyleSheet.create({
  annotationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    width: 60,
    height: 60,
    backgroundColor: "#000",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFD700",
    borderWidth: 5,
    zIndex: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  countText: {
    position: "absolute",
    bottom: -25,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },
  pulse: {
    width: 70,
    height: 70,
    backgroundColor: "black",
    borderRadius: 35,
    position: "absolute",
    zIndex: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  pulse1: {
    width: 70,
    height: 70,
    backgroundColor: "black",
    borderRadius: 35,
    position: "absolute",
    zIndex: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  pulse2: {
    width: 70,
    height: 70,
    backgroundColor: "black",
    borderRadius: 35,
    position: "absolute",
    zIndex: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  pulse3: {
    width: 70,
    height: 70,
    backgroundColor: "black",
    borderRadius: 35,
    position: "absolute",
    zIndex: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  markerText: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomPointAnnotation;
