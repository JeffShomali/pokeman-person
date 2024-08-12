import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import colorSys from "../config/colorSys";

const DEFAULT_AVATAR = require("../assets/images/avatar-dark.png");

const UserAvatar = ({
  image,
  size = 45,
  quality = "small",
  hasShadow = true,
  verified = false,
}) => {
  const uri = useMemo(() => {
    const uniqueTimestamp = new Date().getTime();
    const updatedImage =
      image?.replace("/original/", `/${quality}/`).replace("dev.", "") +
      `?timestamp=${uniqueTimestamp}`;

    return updatedImage;
  }, [image, quality]);
  // State to manage the source of the image
  const [imageSource, setImageSource] = useState({ uri });

  // Function to handle image loading error
  const handleImageError = (error) => {
    console.error("Failed to load image:", error.nativeEvent.error); // More detailed error
    setImageSource(DEFAULT_AVATAR);
  };

  useEffect(() => {
    setImageSource({ uri });
  }, [uri]);

  return (
    <View
      style={[
        styles.wrapper,
        hasShadow && styles.shadowWrapper,
        {
          width: size * 1.5,
          height: size * 1.5,
        },
        hasShadow && { shadowRadius: 14 * 0.45, elevation: 10 * 0.5 },
      ]}
    >
      <View
        style={[
          styles.avatarWrapper,
          {
            width: size,
            height: size,
            borderRadius: size * 0.33,
          },
          verified && styles.verifiedWrapper,
        ]}
      >
        <Image
          source={imageSource} // Updated to use the state variable
          style={[
            styles.avatarPreview,
            {
              width: (size / 45) * 65,
              height: (size / 45) * 65,
            },
          ]}
          resizeMode="cover"
          onError={handleImageError} // Set onError handler
        />
      </View>
    </View>
  );
};

const UserAvatarActionable = ({ image, size, quality, hasShadow, action }) => {
  return (
    <TouchableOpacity onPress={action}>
      <UserAvatar
        image={image}
        size={size}
        quality={quality}
        hasShadow={hasShadow}
      />
    </TouchableOpacity>
  );
};

export default UserAvatar;
export { UserAvatarActionable };

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: colorSys.PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
  },
  verifiedWrapper: {
    borderRadius: 16,
    borderColor: colorSys.YELLOW,
    borderWidth: 2.5,
  },
  wrapper: { justifyContent: "center", alignItems: "center" },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    transform: [{ rotate: "45deg" }],
    margin: 15,
    backgroundColor: colorSys.BLACK_800,
  },
  avatarPreview: {
    resizeMode: "cover",
    transform: [{ rotate: "-45deg" }],
    borderRadius: 9,
  },
});
