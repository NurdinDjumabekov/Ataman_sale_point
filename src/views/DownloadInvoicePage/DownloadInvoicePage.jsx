import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns

/////// icons
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

////// components
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';

////// style
import './style.scss';
import { getData, loadFileInvoiceReq } from 'store/reducers/mainSlice';

////// helpers

const DownloadInvoicePage = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const { nurdin } = useSelector((state) => state.mainSlice);

  const handleDrop = (e) => {
    /// загркузка файла через пертаскивание
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile); // Сохраняем файл в состоянии
      const formData = new FormData();
      formData.append('file', droppedFile);
      dispatch(loadFileInvoiceReq({ data: formData }));
    }
  };

  const onChange = (e) => {
    /// загркузка файла через нажатие
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);
      dispatch(loadFileInvoiceReq(formData));
    } // Сохраняем файл в состоянии
  };

  // console.log(file, 'file');

  //// чтобы избежать открытия файла в браузере и перезагрузки страницы
  const handleDragOver = (e) => e.preventDefault();
  //// нажатте на button => открытие кнопки
  const handleButtonClick = () => fileInputRef.current.click();

  useEffect(() => {
    dispatch(getData({}));
  }, []);

  return (
    <MainCard
      title="Загрузите файл с накладными"
      sx={{
        height: '100%',
        '& > div:nth-of-type(2)': {
          height: 'calc(100% - 72px)'
        }
      }}
    >
      <div className="downloadInvoicePage" onDrop={handleDrop} onDragOver={handleDragOver}>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onChange} />
        <button onClick={handleButtonClick}>
          <DownloadOutlinedIcon />
          <p>Загрузить файлы</p>
        </button>
        {file && <div>Выбран файл: {file.name}</div>}
      </div>
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
