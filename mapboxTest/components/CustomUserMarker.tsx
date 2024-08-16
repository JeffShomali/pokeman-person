import { Image, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import MapboxGL from "@rnmapbox/maps";
import UserAvatar from "./UserAvatar";
MapboxGL.Logger.setLogCallback((log) => {
  // remove Source RNMBX-mapview-point-annotations_drag
  if (
    log.message.includes("RNMBX-mapview-point-annotations_drag") ||
    log.message.includes("RNMBX-mapview-callouts_drag")
  ) {
    return true;
  }
  return false;
});

const CustomUserMarker = ({ user, location }) => {
  const markerRef = useRef(null);
  return (
    <MapboxGL.PointAnnotation
      ref={markerRef}
      key={user.id}
      id={`user-${user.id}`}
      coordinate={location}
      onSelected={() => {}}
    >
      <UserAvatar
        image={user.image}
        hasShadow={true}
        onLoadImage={() => markerRef?.current?.refresh()}
        key={user.id}
      />
    </MapboxGL.PointAnnotation>
  );
};

export default CustomUserMarker;

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  userLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  userNameText: {
    color: "black",
    fontSize: 12,
    marginTop: 4,
  },
  eventMarkerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  eventMarkerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "gold",
  },
  eventTitleText: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },
});
