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
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

/////// fns
import { crudUserReq } from 'store/reducers/usersSlice';
import { crudProdsReq } from 'store/reducers/prodsSlice';

/////// helpers
import { myAlert } from 'helpers/myAlert';
import { listUnit } from 'helpers/myLocal';

const CrudProds = (props) => {
  const { crudProd, setCrudProd, getData, previewImage, setPreviewImage } = props;

  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  console.log(crudProd, 'crudProd');

  const crudDataProds = async (e) => {
    e?.preventDefault();
    if (!!!crudProd?.unit?.value) return myAlert('Выберите ед. измерения');
    const formData = new FormData();
    formData.append('product_name', crudProd?.product_name);
    formData.append('price', crudProd?.price);
    formData.append('description', crudProd?.description);
    formData.append('sale_price', crudProd?.sale_price);
    formData.append('unit_guid', crudProd?.unit?.value);
    formData.append('action_type', crudProd?.action_type);
    formData.append('active', 1);
    formData.append('guid', crudProd?.guid);
    if (!!crudProd?.file) {
      formData.append('file', crudProd?.file);
    }
    const res = await dispatch(crudProdsReq(formData)).unwrap();

    if (res?.result == 1) {
      myAlert(res?.message);
      setCrudProd({});
      getData();
      setPreviewImage(null);
    } else myAlert(res?.message);
  };

  const handleClose = () => setCrudProd({});

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) return myAlert('Можно загружать только изображения!');
      const reader = new FileReader();
      reader.onload = (event) => setPreviewImage(event.target.result);
      reader.readAsDataURL(file);
      setCrudProd({ ...crudProd, file });
      e.target.value = '';
    } else {
      setCrudProd({ ...crudProd, [name]: value });
    }
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
          <form className="crudUsers crudProds" onSubmit={crudDataProds}>
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
            <div className="img-desc">
              <SendInput
                required={false}
                value={crudProd?.description}
                onChange={onChange}
                title={'Описание товара'}
                name={'description'}
                typeInput={'textarea'}
              />
              <div onClick={() => fileInputRef.current.click()} className={'downloadFile'}>
                <div className="load">
                  <DownloadOutlinedIcon />
                  <p>Загрузить</p>
                </div>
                {previewImage && <img src={previewImage} alt="Предпросмотр" className="preview-image" />}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                style={{ display: 'none' }}
                onChange={onChange}
              />
            </div>
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
