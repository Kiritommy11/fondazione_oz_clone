// atoms/dotsCarousel/dotsCarousel.atom.tsx

import React from 'react';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { ScrollView } from 'react-native';

interface DotsCarouselProps {
  length: number;
  currentIndex: number;
setIndex: React.Dispatch<React.SetStateAction<number>>;

  scrollViewRef: React.RefObject<ScrollView | null>;

  itemWidth: number;
  containerStyle?: object;
}

const DotsCarousel: React.FC<DotsCarouselProps> = ({
  length,
  currentIndex,
  setIndex,
  scrollViewRef,
  itemWidth,
  containerStyle,
}) => {
  return (
    <AnimatedDotsCarousel
      length={length}
      currentIndex={currentIndex}
      maxIndicators={4}
      interpolateOpacityAndColor
      scrollableDotsConfig={{
        setIndex,
        onNewIndex: (newIndex) => {
          scrollViewRef?.current?.scrollTo?.({
            x: newIndex * itemWidth,
            animated: true,
          });
        },
        containerBackgroundColor: 'rgba(230,230,230,0.5)',
        container: containerStyle,
      }}
      activeIndicatorConfig={{
        color: 'red',
        margin: 3,
        opacity: 1,
        size: 8,
      }}
      inactiveIndicatorConfig={{
        color: 'black',
        margin: 3,
        opacity: 0.5,
        size: 8,
      }}
      decreasingDots={[
        { config: { color: 'black', margin: 3, opacity: 0.5, size: 6 }, quantity: 1 },
        { config: { color: 'black', margin: 3, opacity: 0.5, size: 4 }, quantity: 1 },
        { config: { color: 'black', margin: 3, opacity: 0.5, size: 2 }, quantity: 1 },
      ]}
    />
  );
};

export default DotsCarousel;
