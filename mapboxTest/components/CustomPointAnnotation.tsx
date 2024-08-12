import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MapboxGL from "@rnmapbox/maps";

const CustomPointAnnotation = ({
  id,
  coordinate,
  title,
  count,
  imageUrl,
  eventColor,
  totalCount,
}) => {
  // Normalize the value between 0 and 1 for shadowOpacity
  const shadowOpacity = count / totalCount;

  // Normalize the value for shadowRadius (e.g., 0 to 50)
  const shadowRadius = (count / totalCount) * 50;

  // Normalize the value for elevation (e.g., 0 to 20)
  const elevation = (count / totalCount) * 20;
  return (
    <MapboxGL.MarkerView id={id} coordinate={coordinate}>
      <View style={styles.annotationContainer}>
        <View style={styles.bubble}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.markerText}>{count}</Text>
          <Text style={styles.countText}>{totalCount}</Text>
        </View>
        <View
          style={[
            styles.pulse,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse1,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse2,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius,
            },
          ]}
        />
        <View
          style={[
            styles.pulse3,
            {
              shadowColor: eventColor,
              shadowOpacity: shadowOpacity,
              elevation: elevation,
              shadowRadius: shadowRadius,
            },
          ]}
        />
      </View>
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
