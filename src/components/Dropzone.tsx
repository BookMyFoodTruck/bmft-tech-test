'use client';
import { NextPage } from 'next';
import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  ExtFile,
} from '@files-ui/react';
import React, { useState } from 'react';
import Image from 'next/image';

import ValidationMsg from './ValidationMsg';
import { useTranslation } from '../i18n/client';
import DropzoneIcon from '../../public/dropzone.svg';

interface Props {
  onChange: (files: File[]) => void;
  errors: any;
}

const DropZone: NextPage<Props> = ({ onChange, errors }) => {
  const { t } = useTranslation();
  const [extFiles, setExtFiles] = useState<ExtFile[]>([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  const updateFiles = (incomingFiles: any) => {
    const validImageFiles = incomingFiles.filter((file: any) =>
      file.type.startsWith('image/'),
    );

    const existingFileNames = extFiles.map(file => file.name);
    const newValidImageFiles = validImageFiles.filter(
      (file: any) => !existingFileNames.includes(file.name),
    );

    if (newValidImageFiles.length > 0) {
      const updatedFiles = [...extFiles, ...newValidImageFiles];
      setExtFiles(updatedFiles);
      if (onChange) {
        onChange(updatedFiles);
      }
    }
  };

  const onDelete = (id: string | number | undefined) => {
    setExtFiles(extFiles.filter(x => x.id !== id));
  };
  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };

  const labelHtml = () => (
    <div className='flex flex-col items-center justify-center space-y-2'>
      <Image
        className='text-gray-500 dark:text-gray-400'
        src={DropzoneIcon}
        alt='dropzone'
        width={30}
        height={10}
      />
      <div className='flex xs:justify-center items-center flex-wrap px-2 gap-2 text-sm text-gray-500 dark:text-gray-400'>
        {t('card.upload_pic')}{' '}
        <p
          className={`font-semibold underline underline-dotted text-[#F08012]`}
        >
          {t('card.upload_here')}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {extFiles.length < 5 && (
        <Dropzone
          onChange={updateFiles}
          minHeight='100px'
          value={extFiles}
          accept='image/*'
          maxFiles={5}
          maxFileSize={20 * 1024 * 1024}
          header={false}
          footer={!!(errors && extFiles.length < 2)}
          //@ts-ignore
          label={labelHtml()}
          fakeUpload
          className='border-gray-300 cursor-pointer hover:bg-gray-100'
          style={{ fontSize: 14 }}
          footerConfig={{
            customMessage: errors.truckimage ? (
              <ValidationMsg>{errors.truckimage.message}</ValidationMsg>
            ) : (
              <p className='text-sm text-gray-500'>{t('card.file_type')}</p>
            ),
          }}
        ></Dropzone>
      )}
      <div
        style={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          rowGap: '35px',
          columnGap: '5px',
          flexWrap: 'wrap',
          margin: '10px 0px 30px 0px',
        }}
      >
        {extFiles.map((file: ExtFile) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            resultOnTooltip
            alwaysActive
            preview
            style={{ width: 80, height: 70 }}
          />
        ))}
      </div>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </>
  );
};

export default DropZone;
