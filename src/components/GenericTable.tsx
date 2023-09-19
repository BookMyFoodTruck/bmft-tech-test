'use client';
import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconPdfDoc from '../../public/icon-pdf-doc.svg';
import IconImgDoc from '../../public/icon-img-doc.svg';
import IconUnploadedDoc from '../../public/icon-doc-unuploaded.svg';
import { useTranslation } from '../i18n/client';
import ImportedFile from './ImportedFile';
import GenericTableControllers from './GenericTableControllers';
import Pagination from '@mui/material/Pagination';
import theme from '../styles/theme';

interface Props {
  isPagination?: boolean;
  isTableHead?: boolean;
  isBorder?: number;
  isShadow?: string;
  defaultRowsPerPage: number;
}
type FileInputRef = React.RefObject<HTMLInputElement>;
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'transparent',
    color: '#939596',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd):hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even):hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FooterTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const GenericTable: React.FC<Props> = ({
  isPagination,
  isTableHead,
  isBorder,
  isShadow,
  defaultRowsPerPage,
}) => {
  const [page, setPage] = React.useState(0);
  const { t } = useTranslation();
  const [file, setFile] = useState<File[]>([]);

  const dynamicHeader = [
    {
      id: 0,
      label: 'Header Title 1',
    },
    {
      id: 1,
      label: 'Header Title 2',
    },
    {
      id: 2,
      label: '',
    },
  ];

  const dynamicRows = [
    {
      id: 0,
      label: t('table.certif_gaz'),
      icon: IconPdfDoc,
    },
    {
      id: 1,
      label: t('table.declar_ddpp'),
      icon: IconImgDoc,
    },
    {
      id: 2,
      label: t('table.certif_haccp'),
      icon: IconPdfDoc,
    },
    {
      id: 3,
      label: t('table.carte_grise'),
      icon: IconImgDoc,
    },
    {
      id: 4,
      label: t('table.cin'),
      icon: IconPdfDoc,
    },
    {
      id: 5,
      label: t('table.kbis'),
      icon: IconImgDoc,
    },
    {
      id: 6,
      label: t('table.docs-civil_prof'),
      icon: IconPdfDoc,
    },
    {
      id: 7,
      label: t('table.rib'),
      icon: IconImgDoc,
    },
  ];

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage - 1);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * defaultRowsPerPage - dynamicRows.length)
      : 0;

  const getFileExtension = (filename: string) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  };

  const getIconForFile = (filename: string) => {
    const extension = getFileExtension(filename);
    if (['pdf', 'docx'].includes(extension)) {
      return IconPdfDoc;
    } else if (['jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
      return IconImgDoc;
    } else {
      return IconUnploadedDoc;
    }
  };

  function useArrayOfRefs(length: number) {
    const refsArray = useRef<(FileInputRef | null)[]>([]);
    if (refsArray.current.length !== length) {
      refsArray.current = Array.from({ length }, () =>
        React.createRef<HTMLInputElement>(),
      );
    }
    return refsArray.current;
  }

  // state variable to store the names of the added files
  const [addedFileNames, setAddedFileNames] = useState<Set<string>>(new Set());
  // Uses the specified refs for each row input
  const inputFileRefs = useArrayOfRefs(dynamicRows.length);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allowedExtensions = ['pdf', 'docx', 'jpg', 'jpeg', 'png', 'webp'];
  const handleRowChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const extension = getFileExtension(selectedFile.name);
      if (allowedExtensions.includes(extension)) {
        // Check if file name is already added
        if (addedFileNames.has(selectedFile.name)) {
          alert('File already added.');
          return;
        }
        setFile(prevFile => {
          const newFile = [...prevFile];
          newFile[id] = selectedFile;
          return newFile;
        });
        // Add file name to addedFileNames state
        setAddedFileNames(
          prevNames => new Set(prevNames.add(selectedFile.name)),
        );
      } else {
        alert('Invalid file extension');
      }
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // Handles the specified row ref by id in each click
  const handleRowClick = (id: number) => {
    if (inputFileRefs[id]?.current) {
      inputFileRefs[id]?.current?.click();
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: isShadow,
          border: isBorder,
          borderRadius: 3,
          borderColor: '#e3dfde',
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label='custom pagination table'>
          {isTableHead && (
            <TableHead>
              <TableRow>
                {dynamicHeader.map(row => (
                  <StyledTableCell key={row.id}>{row.label}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {(defaultRowsPerPage > 0
              ? dynamicRows.slice(
                  page * defaultRowsPerPage,
                  page * defaultRowsPerPage + defaultRowsPerPage,
                )
              : dynamicRows
            ).map((row, index) => {
              const absoluteRowIndex = page * defaultRowsPerPage + index;
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell
                    component='th'
                    scope='row'
                    sx={{ cursor: 'pointer' }}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    onClick={() => handleRowClick(absoluteRowIndex)}
                  >
                    <input
                      type='file'
                      className='hidden'
                      onChange={event => handleRowChange(event, row.id)}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      ref={inputFileRefs[absoluteRowIndex]}
                    />
                    <div className='flex items-center gap-1'>
                      {row.label}
                      <div className='text-md text-[#F72B5A]'>*</div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell
                    align='right'
                    sx={{ cursor: 'pointer' }}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    onClick={() => handleRowClick(absoluteRowIndex)}
                  >
                    <input
                      type='file'
                      className='hidden'
                      onChange={event => handleRowChange(event, row.id)}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      ref={inputFileRefs[absoluteRowIndex]}
                    />
                    {file[row.id] !== undefined ? (
                      <ImportedFile
                        classNames='text-sm text-[#1492E6] text-start'
                        iconName={getIconForFile(file[row.id]?.name)}
                        title={file[row.id]?.name?.toString()}
                      />
                    ) : (
                      <ImportedFile
                        classNames='text-sm text-gray-500 italic text-start'
                        iconName={getIconForFile(t('table.import_doc'))}
                        title={t('table.import_doc')}
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='right' className='max-w-xs lg:w-24'>
                    <GenericTableControllers
                      docStatus={file[row.id]?.name === undefined}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
            {emptyRows > 0 && (
              <FooterTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </FooterTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter className='flex justify-end py-4'>
        {isPagination && (
          <Pagination
            count={Math.ceil(dynamicRows.length / defaultRowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.colors.dark,
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: theme.colors.dark,
                color: '#fff',
              },
            }}
          />
        )}
      </TableFooter>
    </>
  );
};

export default GenericTable;
