'use client';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Logout from '@mui/icons-material/Logout';
import AvatarIcon from '../../public/avatar.svg';
import ArrowdownIcon from '../../public/arrowdown.svg';
import Image from 'next/image';
import { useTranslation } from '../i18n/client';
import Button from './Button';
import theme from '../styles/theme';

export default function MySpaceDropdown() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(false);
  // const open = Boolean(anchorEl);
  const handleClick = () => {
    if (anchorEl === true) {
      // Close the dropdown if it's already open
      setAnchorEl(false);
    } else {
      // Open the dropdown if it's closed
      setAnchorEl(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <div className='relative'>
      <Button
        width={170}
        height={30}
        color={theme.colors.white}
        backgroundColor={theme.colors.white}
        borderColor='transparent'
        id='dropdownDefaultButton'
        data-dropdown-toggle='dropdown'
        className='text-black bg-white font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex justify-center gap-4 items-center'
        type='button'
        onClick={handleClick}
      >
        <Image src={AvatarIcon} alt='avatar' width={15} height={0} />
        <p className='font-semibold text-xs text-gray-800 capitalize'>
          {t('footer.my-space')}
        </p>
        <Image src={ArrowdownIcon} alt='arrowdown' width={10} height={0} />
      </Button>

      <div
        className={`z-10 ${
          anchorEl ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow-lg min-w-44 absolute`}
        id='dropdown'
      >
        <MenuItem onClick={handleClose} className='text-sm'>
          <ListItemIcon>
            <ManageAccountsIcon fontSize='small' />
          </ListItemIcon>
          {t('footer.my-infos')}
        </MenuItem>
        <MenuItem onClick={handleClose} className='text-sm'>
          <ListItemIcon>
            <BookmarkIcon fontSize='small' />
          </ListItemIcon>
          {t('footer.my-bookmarks')}
        </MenuItem>
        <MenuItem onClick={handleClose} className='text-sm'>
          <ListItemIcon>
            <LocalShippingIcon fontSize='small' />
          </ListItemIcon>
          {t('footer.myfav-foodtruck')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} className='text-sm'>
          <ListItemIcon className='underline'>
            <Logout fontSize='small' />
          </ListItemIcon>
          {t('footer.logout')}
        </MenuItem>
      </div>
    </div>
  );
}
