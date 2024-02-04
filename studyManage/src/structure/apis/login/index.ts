import axios from 'axios';

export const login = async (value: any) => {
   const { data } = await axios.post('/login', value);
   return data;
};
