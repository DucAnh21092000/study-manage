import { ICalanderBody } from '@structure/utils';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:2109/api';

export const getListTargetOverview = async (value?: ICalanderBody) => {
   const { data } = await axios.post('overview/getTargetOverview', value);
   return data;
};

export const getListTargetToday = async () => {
   const { data } = await axios.get('target/getTodayTarget');
   return data;
};
