import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { MdPlace } from 'react-icons/md';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {

  const [logado, setLogado] = useState(false);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const AnyReactComponent = () => <MdPlace size={30} color="red" />;

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

  if (latitude === undefined || longitude === undefined) {
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
    <div style={{ height: '100vh', width: '100%', position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDcFwwj4jzI2nZSOH1CGtgwRSDsdlM_HXU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={latitude}
          lng={longitude}
        />

      </GoogleMapReact>

    </div>
  );
}
