import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import MapboxGL, { CircleLayerStyle } from "@rnmapbox/maps";
import Events from "../../data/event_house.json";
import CustomPointAnnotation from "@/components/CustomPointAnnotation";
import { useEffect, useState } from "react";
import Users from "../../data/users.json";
import { getRandomLatLon } from "@/constants/GetRandomLocation";
import CustomUserMarker from "@/components/CustomUserMarker";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiYXJpaml0cmVhY3RuYXRpdmUyMCIsImEiOiJjbHZ6aDUwbGQzMGxyMmlvNmloeTM4ZGhjIn0.R-fCkR4YLW7HaCRn0gopEQ"
);

const event = {
  title: "ODESZA The Final Go...",
  date: "Saturday, Aug 18, 2024 at 3:00 PM",
  duration: "4h 15m",
  startsIn: "Starts in 6h",
  friendsGoing: 3,
  othersGoing: 154,
  imageUrl:
    "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
};

export default function HomeScreen() {
  const [eventDetails, setEventDetails] = useState({});
  const [sortEvents, setSortEvents] = useState([]);
  useEffect(() => {
    const eve = [...Events];
    eve.sort((a, b) => b.pokemon_present - a.pokemon_present);
    setSortEvents(eve);
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={false}
          scaleBarEnabled={false}
          styleURL="mapbox://styles/mapbox/dark-v11"
          onPress={(e) => {
            setEventDetails({}), console.log(e);
          }}
        >
          <MapboxGL.Camera
            zoomLevel={14}
            centerCoordinate={[-122.0652, 37.9055]}
          />
          {Users.map((item) => {
            const location = getRandomLatLon(37.9055, -122.0652, 1000);
            return (
              <CustomUserMarker
                user={item}
                location={[location.longitude, location.latitude]}
              />
            );
          })}
          {sortEvents.map((item, index) => {
            return (
              <CustomPointAnnotation
                id={item.id.toString()}
                coordinate={[item.location.longitude, item.location.latitude]}
                title="Example"
                count={item.pokemon_present}
                imageUrl={item.image}
                eventColor={item.shadow_color}
                totalCount={sortEvents[0].pokemon_present}
                onPressMarker={() => {
                  setEventDetails(item);
                }}
              />
            );
          })}
        </MapboxGL.MapView>
      </View>
      {/* <View style={styles.eventInfo}>
        <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>{event.date}</Text>
          <Text>{event.duration}</Text>
          <Text>{event.startsIn}</Text>
          <Text>
            {event.friendsGoing} of your friends and {event.othersGoing} others
            are going
          </Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    shadowOffset: { width: 8, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  annotationFill: {
    width: 15,
    height: 15,
    backgroundColor: "#007AFF",
    borderRadius: 7.5,
  },
  eventInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#fff",
  },
});
