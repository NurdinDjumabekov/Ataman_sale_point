//////// hooks
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { getData, listInvoiceFN, loadFileInvoiceReq } from 'store/reducers/invoiceSlice';

/////// icons
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

////// components
import MainCard from 'ui-component/cards/MainCard';
import DatePicker from 'react-datepicker';
import ListInvoice from 'components/DownloadInvoicePage/ListInvoice/ListInvoice';
import GeneratePdfInvoice from 'components/DownloadInvoicePage/GeneratePdfInvoice/GeneratePdfInvoice';
import GeneratePdfCheque from 'components/DownloadInvoicePage/GeneratePdfCheque/GeneratePdfCheque';

////// style
import './style.scss';

////// helpers
import { ru } from 'date-fns/locale';
import { parse } from 'date-fns';

const DownloadInvoicePage = () => {
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const { listInvoice } = useSelector((state) => state.invoiceSlice);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const formData = new FormData();
      formData.append('file', droppedFile);
      dispatch(loadFileInvoiceReq(formData));
      e.target.value = '';
    }
  };

  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      dispatch(loadFileInvoiceReq(formData));
      e.target.value = '';
    }
  };

  //// чтобы избежать открытия файла в браузере и перезагрузки страницы
  const handleDragOver = (e) => e.preventDefault();
  //// нажатте на button => открытие кнопки
  const handleButtonClick = () => fileInputRef.current.click();

  const clearData = () => {
    dispatch(listInvoiceFN([]));
  };

  useEffect(() => {
    dispatch(getData({}));
  }, []);

  const checkListInvoice = listInvoice?.length == 0;

  return (
    <MainCard
      title={checkListInvoice ? 'Загрузите файл с накладными' : 'Список накладных'}
      sx={{
        height: '100%',
        '& > div:nth-of-type(2)': {
          height: 'calc(100% - 72px)'
        }
      }}
    >
      <div className="downloadInvoicePage" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="header">
          {!!!checkListInvoice && (
            <button onClick={clearData} className="downloadFileSecond">
              <AutoDeleteIcon />
              <p>Сбросить данные</p>
            </button>
          )}
          <GeneratePdfCheque listInvoice={listInvoice?.filter((item) => item.check_key == 1)} />
          <GeneratePdfInvoice listInvoice={listInvoice?.filter((item) => item.check_key == 1)} />
          {/* {!!file && !!!checkListInvoice && (
            <button onClick={handleButtonClick} className="downloadFileSecond">
              <DownloadOutlinedIcon />
              <p>Загрузить файл</p>
            </button>
          )} */}
          {/* <div className="dateSort">
            <DatePicker
              // selected={parse(new Date(), 'yyyy-MM-dd')}
              selected={new Date()}
              // onChange={onChangeDate}
              yearDropdownItemNumber={100}
              placeholderText="ДД.ММ.ГГГГ"
              shouldCloseOnSelect={true}
              scrollableYearDropdown
              dateFormat="dd.MM.yyyy"
              locale={ru}
            />
          </div> */}
        </div>

        {!!checkListInvoice ? (
          <button onClick={handleButtonClick} className="downloadFileMain">
            <DownloadOutlinedIcon />
            <p>Загрузить файл</p>
          </button>
        ) : (
          <ListInvoice listInvoice={listInvoice} />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </MainCard>
  );
};

export default DownloadInvoicePage;

// [
//   {
//     title: ',ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо	',
//     desc: 'Расходная накладная 102383 от 16.12.2024',
//     prod: [{ name: 'ПЕЛЬМЕНИ "ХАЛАЛ С БУЛЬОНОМ" 500 гр', unit: 'шт', count: '5,000', price: '84,00', res: '420,00' }]
//   },
//   {
//     title: ',ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо	',
//     desc: 'Расходная накладная 102383 от 16.12.2024',
//     prod: [{ name: 'ПЕЛЬМЕНИ "ХАЛАЛ С БУЛЬОНОМ" 500 гр', unit: 'шт', count: '5,000', price: '84,00', res: '420,00' }]
//   },
//   {
//     title: ',ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо	',
//     desc: 'Расходная накладная 102383 от 16.12.2024',
//     prod: [{ name: 'ПЕЛЬМЕНИ "ХАЛАЛ С БУЛЬОНОМ" 500 гр', unit: 'шт', count: '5,000', price: '84,00', res: '420,00' }]
//   }
// ];

[
  ['ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо', 80, 7500],
  [',ЭЛasИМЕ sadas1-я ул. 52,  ж/м Оскон-Ордоsadasdasddb4654', 40, 3565],
  ['11ТЕСТО "1ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 160, 85, 850],
  ['2ТЕСТО "2ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 103, 8213521, 8120],
  ['3ТЕСТО "3ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 1122130, 8123215, 850],
  ['4ТЕСТО "4ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 11232130, 8215, 85120],
  ['5ТЕСТО "5ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 10, 2123185, 85210],
  [',ЭЛasИМЕ sadas1-я ул. 52,  ж/м Оскон-Ордоsadasdasddb4654', 40, 3565],
  ['11ТЕСТО "1ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 160, 85, 850],
  ['2ТЕСТО "2ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 103, 8213521, 8120],
  ['3ТЕСТО "3ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 1122130, 8123215, 850],
  ['4ТЕСТО "4ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 11232130, 8215, 85120],
  ['5ТЕСТО "5ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 10, 2123185, 85210],
  [(',ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо4353', 40, 356212135)],
  [',ЭЛИМЕ 1-я ул. sdfgsdf52,  ж/м Оскон-Ордоafdgfdsfdgs', 4120, 356125],
  ['ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 12130, 8215, 12850],
  [(',ЭЛИМЕ 1-я ул. 52,  ж/м Оск24352345он-Ордо', 41230, 3565)],
  [',ЭЛИМЕ 1-я ул. 52, oi;.jklj3 ж/м Оскон-Ордо', 41230, 35265],
  ['ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 1120, 8215, 8550],
  ['ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', 'шт', 12130, 8125, 8250]
];

[
  {
    title: 'ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо',
    total_count_point: 40,
    total_sum_point: 7500,
    list_invoie: [
      {
        total_count_invoice: 40,
        total_sum: 3565,
        desc: 'ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордоasd',
        prod: [
          { name: '11ТЕСТО "1ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 160, price: 85, total: 850 },
          { name: '2ТЕСТО "2ДОМАШНЕЕ СЛОЕНОЕ" 900 гр..', unit: 'шт', count: 103, price: 8213521, total: 8120 },
          { name: '3ТЕСТО "3ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 1122130, price: 8123215, total: 850 },
          { name: '4ТЕСТО "4ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 11232130, price: 8215, total: 85120 },
          { name: '5ТЕСТО "5ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 10, price: 2123185, total: 85210 }
        ]
      },
      {
        total_count_invoice: 40,
        total_sum: 3565,
        desc: 'ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордоasd',
        prod: [
          { name: '11ТЕСТО "1ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 160, price: 85, total: 850 },
          { name: '2ТЕСТО "2ДОМАШНЕЕ СЛОЕНОЕ" 900 гр..', unit: 'шт', count: 103, price: 8213521, total: 8120 },
          { name: '3ТЕСТО "3ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 1122130, price: 8123215, total: 850 },
          { name: '4ТЕСТО "4ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 11232130, price: 8215, total: 85120 },
          { name: '5ТЕСТО "5ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 10, price: 2123185, total: 85210 }
        ]
      }
    ]
  },
  {
    title: ',ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо4353',
    total_count_point: 40,
    list_invoie: [
      {
        total_count_invoice: 40,
        total_sum: 356212135,
        desc: ',ЭЛИМЕ 1-я ул. sdfgsdf52,  ж/м Оскон-Ордоafdgfdsfdgs',
        prod: [{ name: 'ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр', unit: 'шт', count: 12130, price: 8215, total: 12850 }]
      }
    ]
  },
  {
    title: ',ЭЛИМЕ 1-я ул. 52,  ж/м Оск24352345он-Ордо',
    total_count_point: 41230,
    list_invoie: [
      {
        total_count_invoice: 41230,
        total_sum: 35265,
        desc: ',ЭЛИМЕ 1-я ул. 52, oi;.jklj3 ж/м Оскон-Ордо',
        prod: [
          { name: 'ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 1120, price: 8215, total: 8550 },
          { name: 'ТЕСТО "ДОМАШНЕЕ СЛОЕНОЕ" 900 гр.', unit: 'шт', count: 12130, price: 8125, total: 8250 }
        ]
      }
    ]
  }
];

// var orders_guid = await db.query_await(
//   `
//   EXEC [dbo].[create_edit_order]
//       @action_type = 1,
//       @order_total_sum = 100.50,
//       @order_total_count = 5,
//       @order_total_count_kg = 2;
//   `
// );
