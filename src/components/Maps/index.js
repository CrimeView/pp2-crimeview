import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: -8.1146232,
      lng: -35.0369299
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
          lat={-8.1146232}
          lng={-35.0369299}
          text="Sua localização"
        />
      </GoogleMapReact>
    </div>
  );
}
