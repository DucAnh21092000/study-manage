import axios from 'axios';

const apiUrl = 'http://localhost:2109/api/';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singleFileUpload = async (data: any, options: any) => {
   return await axios.post(apiUrl + 'singleFile', data, options);
};

export const getSingleFiles = async () => {
   const { data } = await axios.get(apiUrl + 'getSingleFiles');
   return data;
};

export const multipleFilesUpload = async (data: FormData) => {
   return await axios.post(apiUrl + 'multipleFiles', data);
};
export const getMultipleFiles = async (recordId: string) => {
   const { data } = await axios.get(apiUrl + 'getFiles/' + recordId);
   return data;
};
