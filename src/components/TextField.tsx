import { NextPage } from 'next';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: any;
}

const TextField: NextPage<Props> = ({ onChange, register }) => {
  return (
    <>
      <div className='w-full mb-4 bg-white dark:bg-gray-700 dark:border-gray-600 max-h-48'>
        <textarea
          {...register('presentation')}
          className='block w-full h-48 px-4 py-2  text-sm text-gray-800 bg-white focus:border-0 border border-gray-200 rounded-md'
          name='presentation'
          id='presentation'
          rows={10}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TextField;
