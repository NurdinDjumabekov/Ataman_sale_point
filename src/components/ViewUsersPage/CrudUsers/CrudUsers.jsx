//////// hooks
import * as React from 'react';
import { useDispatch } from 'react-redux';

////// components
import Dialog from '@mui/material/Dialog';
import SendInput from 'common/SendInput/SendInput';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';

////// style
import './style.scss';
import { styled } from '@mui/material/styles';

////// icons
import CloseIcon from '@mui/icons-material/Close';
import AddUserIcon from '@mui/icons-material/GroupAddOutlined';
import EyesIcon from 'assets/MyIcons/EyesIcon';

/////// fns
import { crudUserReq } from 'store/reducers/usersSlice';

/////// helpers
import { myAlert } from 'helpers/myAlert';

const CrudUsers = (props) => {
  const { crudUser, setCrudUser, getData } = props;
  const dispatch = useDispatch();

  const [viewPassword, setViewPassword] = React.useState(false);

  const crudDataUser = async (e) => {
    e?.preventDefault();
    const res = await dispatch(crudUserReq({ ...crudUser, type: 2 })).unwrap();
    if (res?.result == 1) {
      myAlert(res?.message);
      setCrudUser({});
      getData();
    } else myAlert(res?.message);
  };

  const handleClose = () => setCrudUser({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setCrudUser({ ...crudUser, [name]: value });
  };

  return (
    <>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={[1, 2].includes(crudUser?.action_type)}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontSize: 18 }} id="customized-dialog-title">
          {crudUser?.action_type == 1 ? 'Введите данные пользователя' : 'Редактирование'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="crudUsers" onSubmit={crudDataUser}>
            <SendInput required={true} value={crudUser?.login} onChange={onChange} title={'Логин'} name={'login'} />
            <div className="password">
              <SendInput
                required={true}
                value={crudUser?.password}
                onChange={onChange}
                title={'Пароль'}
                name={'password'}
                type={viewPassword ? 'password' : 'text'}
              />
              <div className="password__action" onClick={() => setViewPassword(!viewPassword)}>
                <EyesIcon />
                {!viewPassword && <div className="line" />}
              </div>
            </div>
            <SendInput required={true} value={crudUser?.fio} onChange={onChange} title={'ФИО'} name={'fio'} />
            <SendInput
              required={true}
              value={crudUser?.user_phone}
              onChange={onChange}
              title={'Номер телефона'}
              name={'user_phone'}
              type={'tel'}
            />
            <button className="saveData" type="submit">
              <AddUserIcon sx={{ width: 20, height: 20 }} />
              <p>Сохранить данные</p>
            </button>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <ConfirmModal
        state={crudUser?.action_type == 3}
        title={`Удалить данные ${crudUser?.fio}?`}
        yesFN={() => crudDataUser(null)}
        noFN={() => setCrudUser({})}
      />
    </>
  );
};
export default CrudUsers;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
