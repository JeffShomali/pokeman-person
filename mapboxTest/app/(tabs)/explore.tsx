import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Text, Alert } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Explore</ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Custom fonts">
//         <ThemedText>
//           Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
//           <ThemedText style={{ fontFamily: 'SpaceMono' }}>
//             custom fonts such as this one.
//           </ThemedText>
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user's current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
//           to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

import React, { useEffect, useState, useRef } from "react";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiYXJpaml0cmVhY3RuYXRpdmUyMCIsImEiOiJjbHZ6aDUwbGQzMGxyMmlvNmloeTM4ZGhjIn0.R-fCkR4YLW7HaCRn0gopEQ"
);

const TabTwoScreen = () => {
  const renderCluster = (cluster, pointCount) => {
    return (
      <View style={styles.clusterContainer}>
        <Text style={styles.clusterText}>{pointCount}</Text>
      </View>
    );
  };

  const renderMarkers = (feature) => {
    const coordinates = feature.geometry.coordinates;
    return (
      <MapboxGL.PointAnnotation
        key={feature.id}
        id={feature.id}
        coordinate={coordinates}
      >
        <View style={styles.markerContainer}>
          <Text style={styles.markerText}>📍</Text>
        </View>
      </MapboxGL.PointAnnotation>
    );
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={[-122.0652, 37.9055]}
        />
        <MapboxGL.ShapeSource
          id="clusterSource"
          shape={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [-122.0647, 37.9012] },
                id: "House B",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0652, 37.9055],
                },
                id: "House A",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0678, 37.8951],
                },
                id: "House C",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0619, 37.9008],
                },
                id: "House D",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0635, 37.902],
                },
                id: "House E",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0656, 37.9075],
                },
                id: "House F",
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-122.0642, 37.9035],
                },
                id: "House G",
              },
            ],
          }}
          cluster
          clusterRadius={30}
        >
          <MapboxGL.SymbolLayer
            id="clusterLayer"
            style={styles.clusterLayer}
            filter={["has", "point_count"]}
          />
          <MapboxGL.CircleLayer
            id="clusteredPoints"
            style={styles.clusteredPoints}
            filter={["!has", "point_count"]}
          />
          <MapboxGL.CircleLayer
            id="singlePoint"
            style={styles.singlePoint}
            filter={["!", ["has", "point_count"]]}
          />
          {/* <MapboxGL.ShapeSource id="unclusteredMarkers">
            {({ features }) =>
              features.map((feature) => renderMarkers(feature))
            }
          </MapboxGL.ShapeSource> */}
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  clusterContainer: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  clusterText: {
    color: "white",
    fontWeight: "bold",
  },
  markerContainer: {
    width: 30,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "red",
    shadowOpacity: 1,
    elevation: 3,
    shadowRadius: 20,
  },
  markerText: {
    color: "white",
  },
  clusterLayer: {
    circlePitchAlignment: "map",
    circleColor: "#f28a24",
    circleRadius: 18,
  },
  clusteredPoints: {
    circleColor: "#f28a24",
    circleRadius: 18,
    circleStrokeWidth: 2,
    circleStrokeColor: "#fff",
  },
  singlePoint: {
    circleColor: "blue",
    circleRadius: 6,
  },
});

export default TabTwoScreen;
