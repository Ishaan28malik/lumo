import React from 'react';

type WeatherInfoProps = {
  Icon: React.ElementType | React.ComponentType;
  type: string;
  temperature: string;
};

function WeatherInfo({ Icon, type, temperature }: WeatherInfoProps) {
  return (
    <div>
      <Icon />
      <p>{type}</p>
      <p>{temperature}</p>
    </div>
  );
}

export default WeatherInfo;
