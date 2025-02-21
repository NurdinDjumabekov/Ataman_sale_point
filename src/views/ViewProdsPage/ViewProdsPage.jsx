////////// hooks
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { crudProdsReq, getAllProdsReq, listProdsFN } from 'store/reducers/prodsSlice';

/////// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';
import EditIcon from 'assets/MyIcons/EditIcon';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
import CrudProds from 'components/ViewProdsPage/CrudProds';

////// style
import './style.scss';

////// helpers
import { Checkbox } from '@mui/material';
import { myAlert } from 'helpers/myAlert';
const apiUrl = import.meta.env.VITE_API_URL_DOMAIN;

const ViewProdsPage = () => {
  const dispatch = useDispatch();

  const { listProds } = useSelector((state) => state.prodsSlice);

  const [crudProd, setCrudProd] = useState({});
  const [previewImage, setPreviewImage] = React.useState(null);

  useEffect(() => {
    getData();
    return () => dispatch(listProdsFN([]));
  }, []);

  const getData = () => dispatch(getAllProdsReq({}));

  return (
    <MainCard
      title={
        <>
          Список товаров{' '}
          <button className="createUser" onClick={() => setCrudProd({ action_type: 1 })}>
            <AddBoxIcon sx={{ width: 20, height: 20 }} />
            <p>Добавить товар</p>
          </button>
        </>
      }
      sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 3 } }}
      contentSX={{ padding: 0 }}
    >
      <div className="viewUsersPage">
        <TableVirtuoso
          data={listProds}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(index, row) => rowContent(index, row, setCrudProd, getData, dispatch, setPreviewImage)}
        />
        <CrudProds
          crudProd={crudProd}
          setCrudProd={setCrudProd}
          getData={getData}
          setPreviewImage={setPreviewImage}
          previewImage={previewImage}
        />
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
          align={'left'}
          style={{ width: column?.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column?.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row, setCrudProd, getData, dispatch, setPreviewImage) {
  const pastFN = (item, action_type) => {
    setCrudProd({ ...item, unit: { label: item?.unit_name, value: item?.unit_guid }, action_type });
    setPreviewImage(`${apiUrl}${item?.path}`);
  };

  const crudDataProds = async (row) => {
    const send = {
      action_type: 2,
      product_name: row?.product_name,
      price: row?.price,
      sale_price: row?.sale_price,
      unit_guid: row?.unit_guid,
      active: row?.active == 1 ? 0 : 1,
      description: row?.description,
      guid: row?.guid
    };
    const res = await dispatch(crudProdsReq(send)).unwrap();
    if (res?.result == 1) getData();
    else myAlert(res?.message);
  };

  return columns?.map((column) => {
    if (column?.dataKey == 'codeid') {
      return <TableCell key={column?.dataKey}>{_index + 1}</TableCell>;
    }
    if (column?.dataKey == 'path') {
      if (!!row?.[column?.dataKey]) {
        return (
          <TableCell key={column?.dataKey}>
            <div className="imgProd">
              <img src={`${apiUrl}${row?.[column?.dataKey]}`} alt="" />
            </div>
          </TableCell>
        );
      }
      return <TableCell key={column?.dataKey}>Отсутствует</TableCell>;
    }
    if (column?.dataKey == '...') {
      return (
        <TableCell key={column?.dataKey} align={'left'}>
          <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
            <button onClick={() => pastFN(row, 2)}>
              <EditIcon width="18" height="18" />
            </button>
            <button onClick={() => pastFN(row, 3)}>
              <DeleteIcon width="20" height="20" color="rgba(255, 0, 0, 0.56)" />
            </button>
            <div className="checkbox" onClick={(e) => crudDataProds(row)}>
              <Checkbox {...label} checked={!!row?.active} sx={{ '& .MuiSvgIcon-root': { fontSize: 20, padding: 0 } }} />
            </div>
          </div>
        </TableCell>
      );
    }
    return (
      <TableCell key={column?.dataKey}>
        {row?.[column?.dataKey]} {column?.dataKey?.includes('price') && 'сом'}
      </TableCell>
    );
  });
}

export default ViewProdsPage;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />)
};

const columns = [
  { width: '5%', label: '№', dataKey: 'codeid' },
  { width: '35%', label: 'Наименование', dataKey: 'product_name' },
  { width: '18%', label: 'Цеховая цена', dataKey: 'price' },
  { width: '18%', label: 'Цена продажи', dataKey: 'sale_price' },
  { width: '15%', label: 'Ед. измерения', dataKey: 'unit_name' },
  { width: '20%', label: 'Картинка', dataKey: 'path' },
  { width: '15%', label: 'Описание', dataKey: 'description' },
  { width: '15%', label: 'Статус', dataKey: '...' }
];

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
