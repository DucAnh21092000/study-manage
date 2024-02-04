/* eslint-disable @typescript-eslint/no-explicit-any */
import { multipleFilesUpload, singleFileUpload } from '@structure/apis/upload';
import React, { useState } from 'react';

interface IProgressEvent {
   loaded: number;
   total: number;
}

const useUpload = () => {
   const [singleFile, setSingleFile] = useState<any>('');
   const [multipleFiles, setMultipleFiles] = useState<any>({
      name: '',
      uid: '',
   });
   const [title, setTitle] = useState('');
   const [singleProgress, setSingleProgress] = useState(0);
   const [multipleProgress, setMultipleProgress] = useState(0);

   const SingleFileChange = (e: any) => {
      setSingleFile(e.target?.files[0]);
      setSingleProgress(0);
   };
   const MultipleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
      setMultipleFiles(
         (e.target as HTMLInputElement)?.files?.[0] ?? { name: '', uid: '' }
      );
      setMultipleProgress(0);
   };
   const singleFileOptions = {
      onUploadProgress: (progressEvent: IProgressEvent) => {
         const { loaded, total } = progressEvent;
         const percentage = Math.floor(
            ((loaded / 1000) * 100) / (total / 1000)
         );
         setSingleProgress(percentage);
      },
   };

   const uploadSingleFile = async () => {
      const formData = new FormData();
      formData.append('file', singleFile);
      await singleFileUpload(formData, singleFileOptions);
   };
   const UploadMultipleFiles = async () => {
      const formData = new FormData();
      formData.append('title', title);
      for (let i = 0; i < multipleFiles.length; i++) {
         formData.append('files', multipleFiles[i]);
      }
      await multipleFilesUpload(formData);
   };
   return {
      uploadSingleFile,
      UploadMultipleFiles,
      setMultipleFiles,
      multipleFiles,
      setMultipleProgress,
      singleProgress,
      multipleProgress,
      setSingleProgress,
      SingleFileChange,
      MultipleFileChange,
      setTitle,
   };
};

export default useUpload;
