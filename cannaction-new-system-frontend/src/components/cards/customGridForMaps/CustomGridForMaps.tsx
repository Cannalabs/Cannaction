import React, { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
// import GeoChart from '../../geoChart/GeoChart';
import LeafletMap from '../../leafletMap/LeafletMap';

interface CustomGridForMapsProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  mapData: { latitude: number; longitude: number }[];
  children?: ReactNode;
}

// interface CustomGridForMapsProps {
// 	title: string;
// 	subtitle: string;
// 	imageSrc: string;
// 	mapData: { latitude: number; longitude: number }[]; // Dados para o mapa
//   }
const CustomGridForMaps: React.FC<CustomGridForMapsProps> = ({
  title,
  subtitle,
  imageSrc,
  mapData,
  children,
}) => {
  return (
    <Grid justifyContent="space-between">
      <Grid className="custom-grid-central-content">
        <Grid
          p="1rem"
          container
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(33, 40, 50, 0.03)"
          borderBottom="1px solid lightgray"
        >
          <Typography variant="h1" color="#1b7f75" fontSize="1.1rem">
            {title}
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="subtitle1" color="initial">
            {subtitle}
          </Typography>
        </Grid>

        {/* Mapa dinâmico */}
        <Grid container justifyContent="center" style={{ height: '400px' }}>
          <div style={{ width: '90%', height: '100%' }}>
            {/* <GeoChart mapData={mapData} /> */}
            <LeafletMap mapData={mapData} />
          </div>
        </Grid>

        <Grid
          p="1rem"
          container
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(33, 40, 50, 0.03)"
          borderTop="1px solid lightgray"
        >
          <Typography variant="h6" color="rgb(228, 221, 247)" fontSize="1rem">
            {subtitle}
          </Typography>
        </Grid>
      </Grid>

      {/* Children */}
      {children}
    </Grid>
  );
};

export default CustomGridForMaps;
