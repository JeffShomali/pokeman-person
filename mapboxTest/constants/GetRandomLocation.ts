export function getRandomLatLon(centerLat, centerLon, radiusInMeters) {
  const radiusInDegrees = radiusInMeters / 111320; // Convert radius to degrees

  // Generate random offsets
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const xOffset = w * Math.cos(t);
  const yOffset = w * Math.sin(t);

  // Adjust the xOffset for the shrinking of the east-west distances
  const newLat = centerLat + yOffset;
  const newLon = centerLon + xOffset / Math.cos(centerLat * (Math.PI / 180));

  return { latitude: newLat, longitude: newLon };
}
