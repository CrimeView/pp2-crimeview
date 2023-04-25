import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  function handleLocation(position) {
    const latitudeUser = position.coords.latitude;
    const longitudeUser = position.coords.longitude;
    setLatitude(latitudeUser);
    setLongitude(longitudeUser);
  }

  function handleError(error) {
    console.error(error);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(handleLocation, handleError);
  }

  if(latitude === undefined || longitude === undefined){
    getLocation();
    return
  }


  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 16
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>   
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDcFwwj4jzI2nZSOH1CGtgwRSDsdlM_HXU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={latitude}
          lng={longitude}
          text="Sua localização"
        />

      </GoogleMapReact>

    </div>
  );
}
