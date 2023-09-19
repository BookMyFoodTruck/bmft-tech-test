import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
  iconName?: string;
  title?: string;
  classNames?: string;
}

const ImportedFile: NextPage<Props> = ({ iconName, title, classNames }) => {
  return (
    <div className='flex items-center w-full gap-4'>
      {iconName && (
        <Image alt='img doc icon' width={28} height={10} src={iconName} />
      )}
      <span className={classNames}>{title}</span>
    </div>
  );
};

export default ImportedFile;
