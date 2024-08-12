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

   return (
      <div className='map__container'>
         <Map
            defaultZoom={17}
            defaultCenter={markersLocation[0]}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
         >
            {markersLocation.map((markerLocation) => (
               <Marker key={markerLocation.id} position={markerLocation} />
            ))}
         </Map>
      </div>
   );
};

export default CustomMap;
