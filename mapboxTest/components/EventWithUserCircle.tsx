import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import MapboxGL from "@rnmapbox/maps";
const images = [
  "https://randomuser.me/api/portraits/women/16.jpg",
  "https://randomuser.me/api/portraits/men/25.jpg",
  "https://randomuser.me/api/portraits/women/36.jpg",
  "https://randomuser.me/api/portraits/women/16.jpg",
  "https://randomuser.me/api/portraits/men/25.jpg",
  "https://randomuser.me/api/portraits/women/36.jpg",
];

const radius = 50;
const centerImageSize = 80;

const EventWithUserCircle = ({ id, coordinate }) => {
  return (
    <MapboxGL.MarkerView id={id} coordinate={coordinate}>
      <View style={styles.container}>
        {images.map((uri, index) => {
          const angle = (index / (images.length - 1)) * Math.PI - Math.PI / 1;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <Image
              key={index}
              source={{ uri }}
              style={[styles.profileImage, { left: x, top: y }]}
            />
          );
        })}
        <View style={styles.centerContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D",
            }}
            style={styles.centerImage}
          />
          <Text style={styles.centerText}>1.1k</Text>
        </View>
        <Text style={styles.countText}>+2k</Text>
      </View>
    </MapboxGL.MarkerView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    position: "absolute",
  },
  centerContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    width: centerImageSize,
    height: centerImageSize,
    borderRadius: centerImageSize / 2,
    borderWidth: 5,
    borderColor: "#A2D729",
  },
  centerText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  countText: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 16,
    color: "#fff",
  },
});

export default EventWithUserCircle;
