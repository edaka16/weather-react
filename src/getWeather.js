import Axios from 'axios';

export default async function getWeatherData (city) {
  return await Axios.get(`http://api.openweathermap.org/data/2.5/forecast?APPID=ff8a75a1644827a739d93639f1b63f4a`, {
    params: {
      q: city,
      units: 'metric'// per  Celsius
    }
  })
}