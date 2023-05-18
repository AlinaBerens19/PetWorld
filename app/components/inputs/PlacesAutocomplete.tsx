'use client';

import { FieldValues, UseFormRegister } from 'react-hook-form';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface PlacesAutocompleteProps {
    register?: UseFormRegister<FieldValues>;
    onAddressSelect?: (address: string, latLng: google.maps.LatLngLiteral) => void;
  }

  const PlacesAutocomplete = ({
    onAddressSelect,
  }: PlacesAutocompleteProps) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: { componentRestrictions: { country: 'us' } },
      debounce: 300,
      cache: 86400,
    });
  
    const renderSuggestions = () => {
      return data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
          description,
        } = suggestion;
  
      console.log('PLACE ==> ', suggestion);
  
        return (
          <li
            key={place_id}
            onClick={async () => {
              setValue(description, false);
              clearSuggestions();
              try {
                const results = await getGeocode({ address: description });
                const { lat, lng } = await getLatLng(results[0]);
                onAddressSelect && onAddressSelect(description, { lat, lng });
                console.log('Lat: ', lat, 'Lng: ', lng);

              } catch (error) {
                console.log('Error: ', error);
              }
            }}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    };
  
    return (
      <div className="flex flex-row w-full py-2">
        <input
          value={value}
          className="w-full border border-neutral-300 rounded-md px-4 py-2"
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          placeholder={value}
        />
  
        {status === 'OK' && (
          <ul className="absolute top-full left-0 w-full border border-neutral-300 bg-white    list-none p-0 m-0 z-50">{renderSuggestions()}</ul>
        )}
      </div>
    );
  };


export default PlacesAutocomplete;