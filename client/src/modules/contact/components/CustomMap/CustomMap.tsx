import './CustomMap.scss';
import React, { useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';

const CustomMap: React.FC = () => {
   const [markersLocation, setMarkersLocation] = useState<
      {
         id: number;
         lat: number;
         lng: number;
      }[]
   >([
      {
         id: 1,
         lat: 49.811027,
         lng: 23.974144,
      },
      {
         id: 2,
         lat: 49.811796,
         lng: 23.974714,
      },
   ]);

   const handleMarkerClick = (lat: number, lng: number) => {
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(googleMapsUrl, '_blank');
   };
   return (
      <div className='map__container'>
         <Map
            defaultZoom={17}
            defaultCenter={{ lat: 49.81156505739717, lng: 23.974355648327954 }}
            gestureHandling={'greedy'}
            zoomControl={true}
            disableDefaultUI={false}
         >
            {markersLocation.map((markerLocation) => (
               <Marker
                  key={markerLocation.id}
                  position={markerLocation}
                  onClick={() =>
                     handleMarkerClick(markerLocation.lat, markerLocation.lng)
                  }
               />
            ))}
         </Map>
      </div>
   );
};

export default CustomMap;
