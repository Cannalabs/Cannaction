import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  mapData: { latitude: number; longitude: number }[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ mapData }) => {
  return (
    <MapContainer
      center={[mapData[0].latitude, mapData[0].longitude]}
      zoom={12}
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mapData.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]}>
          <Popup>{`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
