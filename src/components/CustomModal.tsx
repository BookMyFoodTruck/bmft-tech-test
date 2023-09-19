import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { NextPage } from 'next';
import SuccessEmojiIcon from '../../public/icon-success-emoji.svg';
import Button from './Button';
import { useTranslation } from '../i18n/client';
import theme from '../styles/theme';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

interface Props {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  variant: 'Default' | 'Double';
}

const CustomModal: NextPage<Props> = ({ open, setOpen, variant }) => {
  const { t } = useTranslation();
  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <div>
      {open !== undefined && (
        <Modal
          open={open}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          className='overflow-y-auto'
        >
          <Box
            sx={style}
            className='flex items-center justify-center flex-col rounded-2xl min-h-24 gap-4 w-[60%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] px-2 py-6'
          >
            <Image src={SuccessEmojiIcon} alt='emoji' width={50} height={10} />
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              className={`text-center text-sm text-${theme.colors.primary} font-semibold px-8`}
            >
              {t('modal.congrats')}
            </Typography>
            <Typography
              id='modal-modal-description'
              className='text-center text-xs font-semibold text-gray-800 px-8'
            >
              {t('modal.modal-mail_message')}
            </Typography>
            <Typography
              id='modal-modal-description'
              className='text-center text-xs font-semibold text-gray-800 px-10'
            >
              {t('modal.modal-wait_message')}
            </Typography>
            <div className='flex justify-center gap-2'>
              <Button
                width={120}
                height={40}
                color={theme.colors.white}
                rounded={'lg'}
                backgroundColor={theme.colors.primary}
                type={'submit'}
                onClick={handleClose}
              >
                <p className='text-center text-xs md:text-sm lg:text-sm text-white'>
                  {t('modal.go')}
                </p>
              </Button>

              {variant === 'Double' && (
                <Button
                  width={120}
                  height={40}
                  color={theme.colors.white}
                  rounded={'lg'}
                  backgroundColor={theme.colors.primary}
                  type={'submit'}
                  onClick={handleClose}
                >
                  <p className='text-center text-xs md:text-sm lg:text-sm text-white'>
                    {t('modal.go')}
                  </p>
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CustomModal;
