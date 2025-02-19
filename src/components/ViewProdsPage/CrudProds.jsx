//////// hooks
import * as React from 'react';
import { useDispatch } from 'react-redux';

////// components
import Dialog from '@mui/material/Dialog';
import SendInput from 'common/SendInput/SendInput';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import Select from 'react-select';

////// style
import './style.scss';
import { styled } from '@mui/material/styles';

////// icons
import CloseIcon from '@mui/icons-material/Close';
import AddUserIcon from '@mui/icons-material/GroupAddOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';

/////// fns
import { crudUserReq } from 'store/reducers/usersSlice';

/////// helpers
import { myAlert } from 'helpers/myAlert';
import { listUnit } from 'helpers/myLocal';
import { crudProdsReq } from 'store/reducers/prodsSlice';

const CrudProds = (props) => {
  const { crudProd, setCrudProd, getData } = props;

  const dispatch = useDispatch();

  const crudDataProds = async (e) => {
    e?.preventDefault();
    const send = {
      product_name: crudProd?.product_name,
      price: crudProd?.price,
      sale_price: crudProd?.sale_price,
      unit_guid: crudProd?.unit?.value,
      action_type: crudProd?.action_type,
      active: crudProd?.active,
      guid: crudProd?.guid
    };
    const res = await dispatch(crudProdsReq(send)).unwrap();
    if (res?.result == 1) {
      myAlert(res?.message);
      setCrudProd({});
      getData();
    } else myAlert(res?.message);
  };

  const handleClose = () => setCrudProd({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudProd({ ...crudProd, [name]: value });
  };

  const onChangeWS = (unit) => setCrudProd({ ...crudProd, unit });

  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={[1, 2].includes(crudProd?.action_type)}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontSize: 18 }} id="customized-dialog-title">
          {crudProd?.action_type == 1 ? 'Введите данные' : 'Редактирование'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="crudUsers" onSubmit={crudDataProds}>
            <SendInput required={true} value={crudProd?.product_name} onChange={onChange} title={'Наименование'} name={'product_name'} />
            <div className="myInputs">
              <h5>Единица измерения</h5>
              <Select options={listUnit} className="select" onChange={onChangeWS} value={crudProd?.unit} />
            </div>
            <SendInput required={true} value={crudProd?.price} onChange={onChange} title={'Цеховая цена'} name={'price'} type={'number'} />
            <SendInput
              required={true}
              value={crudProd?.sale_price}
              onChange={onChange}
              title={'Цена продажи'}
              name={'sale_price'}
              type={'number'}
            />
            <button className="saveData" type="submit">
              <SaveAsIcon sx={{ width: 19, height: 19 }} />
              <p>Сохранить данные</p>
            </button>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <ConfirmModal
        state={crudProd?.action_type == 3}
        title={`Удалить "${crudProd?.product_name}" ?`}
        yesFN={() => crudDataProds(null)}
        noFN={() => setCrudProd({})}
      />
    </>
  );
};
export default CrudProds;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
