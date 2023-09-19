import { NextPage } from 'next';
import Image from 'next/image';
import IconUnuploadDoc from '../../public/icon-file-warning.svg';
import IconUploadDoc from '../../public/icon-upload-doc.svg';
import IconDocUploaded from '../../public/icon-doc-uploaded.svg';

interface Props {
  iconName?: string;
  title?: string;
  docStatus?: boolean;
}

const GenericTableControllers: NextPage<Props> = ({ docStatus }) => {
  return (
    <div className='flex items-center justify-between w-16 min-w-fit gap-2'>
      {docStatus !== true ? (
        <Image
          alt='pdf doc icon'
          src={IconDocUploaded}
          className='cursor-pointer'
        />
      ) : (
        <Image
          alt='pdf doc icon'
          src={IconUnuploadDoc}
          className='cursor-pointer'
        />
      )}
      <Image
        alt='pdf doc icon'
        src={IconUploadDoc}
        className='cursor-pointer'
      />
    </div>
  );
};

export default GenericTableControllers;
