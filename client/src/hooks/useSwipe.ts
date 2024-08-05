import { MouseEvent, TouchEvent, useState } from 'react';

interface SwipeInput {
   onSwipedLeft: () => void;
   onSwipedRight: () => void;
}

interface SwipeOutput {
   onTouchStart: (e: TouchEvent) => void;
   onTouchMove: (e: TouchEvent) => void;
   onTouchEnd: () => void;
   onMouseDown: (e: MouseEvent) => void;
   onMouseUp: () => void;
   onMouseMove: (e: MouseEvent) => void;
}

export default (input: SwipeInput): SwipeOutput => {
   const [touchStart, setTouchStart] = useState(0);
   const [touchEnd, setTouchEnd] = useState(0);
   const [mouseDown, setMouseDown] = useState(0);
   const [mouseUp, setMouseUp] = useState(0);

   const minSwipeDistance = 50;

   const onTouchStart = (e: TouchEvent) => {
      setTouchEnd(0);
      setTouchStart(e.targetTouches[0].clientX);
   };

   const onTouchMove = (e: TouchEvent) =>
      setTouchEnd(e.targetTouches[0].clientX);

   const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe) {
         input.onSwipedLeft();
      }
      if (isRightSwipe) {
         input.onSwipedRight();
      }
   };
   const onMouseDown = (e: MouseEvent) => {
      setMouseUp(0);
      setMouseDown(e.clientX);
   };

   const onMouseMove = (e: MouseEvent) => {
      setMouseUp(e.clientX);
   };

   const onMouseUp = () => {
      if (!mouseDown || !mouseUp) return;
      const distance = mouseDown - mouseUp;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe) {
         input.onSwipedLeft();
      }
      if (isRightSwipe) {
         input.onSwipedRight();
      }
   };

   return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
   };
};
