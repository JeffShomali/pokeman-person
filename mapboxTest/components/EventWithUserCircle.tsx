import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
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

const EventWithUserCircle = ({
  id,
  coordinate,
  imageUrl,
  eventColor,
  count,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animations = useRef(images.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    handlePress();
  }, []);

  const handlePress = () => {
    setExpanded(!expanded);
    Animated.stagger(
      100,
      animations.map((anim) =>
        Animated.spring(anim, {
          toValue: expanded ? 0 : 1,
          useNativeDriver: false,
        })
      )
    ).start();
  };
  return (
    <MapboxGL.MarkerView id={id} coordinate={coordinate}>
      <View style={styles.container}>
        {images.map((uri, index) => {
          const angle = (index / (images.length - 1)) * Math.PI - Math.PI / 1;
          const x = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.cos(angle)],
          });
          const y = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, radius * Math.sin(angle)],
          });
          return (
            <Animated.Image
              key={index}
              source={{ uri }}
              style={[
                styles.profileImage,
                { transform: [{ translateX: x }, { translateY: y }] },
              ]}
            />
          );
        })}
        <View style={styles.centerContainer}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={[styles.centerImage, { borderColor: eventColor }]}
          />
          <Text style={styles.centerText}>{count}</Text>
        </View>
        <Text style={styles.countText}></Text>
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
