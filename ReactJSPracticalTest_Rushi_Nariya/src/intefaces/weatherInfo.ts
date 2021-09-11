
import mainData from './mainData';

interface weatherInfo {
  city?: string;
  country?: string;
  data?: Date;
  description?: string;
  main?: mainData;
  sunrise?: Date;
  sunset?: Date;
  clouds?: number;
  wind?: number;
  latitude?: number;
  longitude?: number;
  icon?: string;
  forecastHourly?: Array<any>;
  forecastDaily?: Array<any>;
}

export default weatherInfo;