////////// hooks
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { getAllUserReq, listUsersFN } from 'store/reducers/usersSlice';

/////// icons
import AddUserIcon from '@mui/icons-material/GroupAddOutlined';
import EditIcon from 'assets/MyIcons/EditIcon';
import DeleteIcon from 'assets/MyIcons/DeleteIcon';

////// components
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import CrudUsers from 'components/ViewUsersPage/CrudUsers/CrudUsers';

////// style
import './style.scss';

////// helpers
import { ru } from 'date-fns/locale';
import { format, parse } from 'date-fns';

const ViewUsersPage = () => {
  const dispatch = useDispatch();

  const { listUsers } = useSelector((state) => state.usersSlice);

  const [crudUser, setCrudUser] = useState({});

  useEffect(() => {
    getData();

    return () => dispatch(listUsersFN([]));
  }, []);

  const getData = () => dispatch(getAllUserReq({}));

  return (
    <MainCard
      title={
        <>
          Список пользователей{' '}
          <button className="createUser" onClick={() => setCrudUser({ action_type: 1 })}>
            <AddUserIcon sx={{ width: 20, height: 20 }} />
            <p>Добавить пользователя</p>
          </button>
        </>
      }
      sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 3 } }}
      contentSX={{ padding: 0 }}
    >
      <div className="viewUsersPage">
        <TableVirtuoso
          data={listUsers}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row, setCrudUser)}
        />
        <CrudUsers crudUser={crudUser} setCrudUser={setCrudUser} getData={getData} />
      </div>
    </MainCard>
  );
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns?.map((column) => (
        <TableCell
          key={column?.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column?.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column?.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row, setCrudUser) {
  return columns?.map((column) => {
    if (column?.dataKey == '...') {
      return (
        <TableCell key={column?.dataKey} align={'left'}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
            <button onClick={() => setCrudUser({ ...row, action_type: 2 })}>
              <EditIcon width="18" height="18" />
            </button>
            <button onClick={() => setCrudUser({ ...row, action_type: 3 })}>
              <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" />
            </button>
          </div>
        </TableCell>
      );
    }
    if (column?.dataKey == 'status') {
      return (
        <TableCell key={column?.dataKey} align={column?.numeric || false ? 'right' : 'left'}>
          {row?.[column?.dataKey] == 1 ? (
            <p style={{ color: '#00ab55' }}>Активный</p>
          ) : (
            <p style={{ color: 'rgba(255, 0, 0, 0.56)' }}>Не активный</p>
          )}
        </TableCell>
      );
    }
    return (
      <TableCell key={column?.dataKey} align={column?.numeric || false ? 'right' : 'left'}>
        {row?.[column?.dataKey]}
      </TableCell>
    );
  });
}

export default ViewUsersPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '10%', label: '№', dataKey: 'codeid' },
  // { width: '20%', label: 'ФИО', dataKey: 'fio' },
  { width: '20%', label: 'Номер', dataKey: 'user_phone' },
  { width: '20%', label: 'Роль', dataKey: 'role' },
  { width: '20%', label: 'Статус', dataKey: 'status' },
  { width: '20%', label: 'Дата создания', dataKey: 'date' },
  { width: '10%', label: '...', dataKey: '...' }
];
