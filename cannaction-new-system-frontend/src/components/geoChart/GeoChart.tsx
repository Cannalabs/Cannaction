import React from 'react';
import { Chart } from 'react-google-charts';

interface GeoChartProps {
  mapData: { latitude: number; longitude: number }[];
}

const GeoChart: React.FC<GeoChartProps> = ({ mapData }) => {
  const chartData = mapData.map((point) => [
    { lat: point.latitude, lng: point.longitude },
    1,
  ]);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="GeoChart"
      data={[['Location', 'Popularity'], ...chartData]}
      options={{
        region: 'BR',
        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#f8bbd0',
        defaultColor: '#f5f5f5',
      }}
      mapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default GeoChart;
