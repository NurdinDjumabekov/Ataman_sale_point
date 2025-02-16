////// hooks
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

///// style
import './style.scss';

///// components
import TableInvoice from '../TableInvoice/TableInvoice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const ListInvoice = (props) => {
  const { list } = props;

  const dispatch = useDispatch();

  return (
    <div className="invoice-container">
      <div className="prods">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody style={{ cursor: 'pointer' }}>
              {list?.map((item, index) => (
                <TableInvoice key={index} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListInvoice;
