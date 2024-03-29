'use client';


import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PlacesAutocomplete from './PlacesAutocomplete';

interface SimpleMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const SimpleMap: NextPage<SimpleMapProps> = ({ onLocationSelect }) => {
  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="relative">
      <div className="h-1/2 w-full">
        <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);

                setLat(lat);
                setLng(lng);
                onLocationSelect(lat, lng);
              });
            }}
          />
          <GoogleMap
              options={mapOptions}
              zoom={14}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '100%', height: '50vh' }}
              onLoad={() => console.log('Map Component Loaded...')}
            />
            
        </div>
    </div>
    </>
  );
}



export default SimpleMap;