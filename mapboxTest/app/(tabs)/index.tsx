import { Image, StyleSheet, Platform, View, Text } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import Events from "../../data/event_house.json";
import CustomPointAnnotation from "@/components/CustomPointAnnotation";
import { useEffect, useState } from "react";
import Users from "../../data/users.json";
import { getRandomLatLon } from "@/constants/GetRandomLocation";
import CustomUserMarker from "@/components/CustomUserMarker";
import EventWithUserCircle from "@/components/EventWithUserCircle";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [heatMapData, setHeatMapData] = useState({});
  useEffect(() => {
    const eve = [...Events];
    eve.sort((a, b) => b.pokemon_present - a.pokemon_present);
    setSortEvents(eve);
    if (Users.length > 0) {
      let features = [];
      Users.map((data) => {
        const obj = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data.location.longitude, data.location.latitude],
          },
          properties: {
            title: data.name,
          },
        };

        features.push(obj);
      });
      setHeatMapData({
        type: "FeatureCollection",
        features: features,
      });
    }
    Image.getSize(
      "https://randomuser.me/api/portraits/men/45.jpg",
      (width, height) => {
        MapboxGL.images = {
          userIcon: { uri: "https://randomuser.me/api/portraits/men/45.jpg" },
        };
        setImageLoaded(true); // Ensure the image is loaded before rendering the layer
      }
    );
  }, []);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const heatmapLayer = {
    id: "heatmap",
    sourceID: "heatmapSource",
    type: "heatmap",
    paint: {
      // Customize the heatmap intensity
      "heatmap-intensity": {
        stops: [
          [0, 1],
          [10, 3],
        ],
      },
      // Customize the heatmap color gradient
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],
      // Customize the heatmap radius
      "heatmap-radius": {
        stops: [
          [0, 2],
          [10, 20],
        ],
      },
      // Set the heatmap opacity
      "heatmap-opacity": 0.3,
    },
  };

  const pointLayer = {
    id: "pointLayer",
    sourceID: "heatmapSource",
    type: "symbol",
    layout: {
      "icon-image": "userIcon", // Replace with your custom image if needed
      "icon-size": 1,
      "icon-allow-overlap": true,
    },
  };

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
            setEventDetails({});
          }}
          onRegionDidChange={(region) =>
            setZoomLevel(region.properties.zoomLevel)
          }
        >
          <MapboxGL.Camera
            zoomLevel={zoomLevel}
            centerCoordinate={[-122.0652, 37.9055]}
          />
          <MapboxGL.ShapeSource id="heatmapSource" shape={heatMapData}>
            {/* {zoomLevel <= 10 ? ( */}
            <MapboxGL.HeatmapLayer {...heatmapLayer} />
            {/* ) : (
              <>{imageLoaded && <MapboxGL.SymbolLayer {...pointLayer} />}</>
            )} */}
          </MapboxGL.ShapeSource>
          {/* {isEmpty(eventDetails) && (
            <>
              {Users.map((item) => {
                return (
                  <CustomUserMarker
                    user={item}
                    location={[location.longitude, location.latitude]}
                  />
                );
              })}
            </>
          )}
          {!isEmpty(eventDetails) && (
            <EventWithUserCircle
              id={"1"}
              coordinate={[
                eventDetails?.location?.longitude,
                eventDetails?.location?.latitude,
              ]}
              imageUrl={eventDetails?.image}
              eventColor={eventDetails?.shadow_color}
              count={eventDetails?.pokemon_present}
            />
          )}
          {isEmpty(eventDetails) && (
            <>
              {sortEvents.map((item, index) => {
                return (
                  <CustomPointAnnotation
                    id={item?.id?.toString()}
                    coordinate={[
                      item?.location?.longitude,
                      item?.location?.latitude,
                    ]}
                    title="Example"
                    count={item?.pokemon_present}
                    imageUrl={item?.image}
                    eventColor={item?.shadow_color}
                    totalCount={sortEvents[0]?.pokemon_present}
                    onPressMarker={() => {
                      setEventDetails(item);
                    }}
                  />
                );
              })}
            </>
          )} */}
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
