import React from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { ITEM_WIDTH } from "./CarouselCardItem";
import data from "./data";

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={6}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={250}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={{ marginLeft: 5 }}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        containerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
          marginRight: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(53, 113, 78, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;
