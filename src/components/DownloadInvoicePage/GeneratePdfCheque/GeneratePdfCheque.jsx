///// hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

////// style
import { styles } from './style';
import './style.scss';

////// components
import { pdf, Document, Page, Text, View, Image } from '@react-pdf/renderer';

////// helpers
import { myAlert } from 'helpers/myAlert';

////// icons
import logo from '../../../assets/images/logo.png';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { preloader_inv_FN } from 'store/reducers/invoiceSlice';

const GeneratePdfCheque = ({ listInvoice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pdfRef = useRef(null);

  const handlePrint = async (listInvoice) => {
    const doc = (
      <Document>
        <Page size={{ width: 225 }} style={styles.page}>
          {listInvoice?.map((item) => (
            <React.Fragment key={item?.invoice_guid}>
              <View style={styles.section}>
                <Image src={logo} style={styles.image} />
              </View>
              <Text style={styles.header}>Чек № {item?.point_name?.replace(/Расходная накладная/g, '').trim()}</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.numsTitle]}>
                    <Text style={[styles.textTitle, styles.nums]}>№</Text>
                  </View>
                  <View style={[styles.tableCol, styles.names]}>
                    <Text style={[styles.textTitle, styles.name]}>Наименование</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Кол-во</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther]}>
                    <Text style={styles.textTitle}>Цена</Text>
                  </View>
                  <View style={[styles.tableCol, styles.headersOther, styles.rightNone]}>
                    <Text style={styles.textTitle}>Сумма</Text>
                  </View>
                </View>
                {item?.prods?.map((i, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={[styles.tableCol, styles.numsMain]}>
                      <Text style={[styles.tableCell, styles.numsMainInner]}>{index + 1}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.namesInner]}>
                      <Text style={[styles.tableCell, styles.numsInnerText]}>{i?.product_name}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>
                        {i?.count} {i?.unit}
                      </Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther]}>
                      <Text style={styles.tableCell}>{i?.price}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.headersOther, styles.rightNone]}>
                      <Text style={styles.tableCell}>{i?.total}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.footer}>
                <View style={[styles.answer, styles.answerLine]}>
                  <Text style={styles.linetext}>Итого: </Text>
                  <Text style={styles.linetext}>{item?.total_price} сом</Text>
                </View>
              </View>
              <Text style={{}}>.</Text>
              <Text style={{}}>.</Text>
            </React.Fragment>
          ))}
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);

    if (pdfRef.current) {
      pdfRef.current.src = url;
      pdfRef.current.onload = () => {
        pdfRef.current.contentWindow.print();
      };
    }
  };

  const printFn = () => {
    if (listInvoice?.length == 0) return myAlert('У вас пустой список!', 'error');
    dispatch(preloader_inv_FN(true));
    handlePrint(listInvoice);
    setTimeout(() => {
      dispatch(preloader_inv_FN(false));
    }, 5000);
  };

  return (
    <div className="generateBlock">
      <button className="activePdf qrChecks" onClick={printFn}>
        <FileCopyIcon />
        <p>Распечатать чек</p>
      </button>
      <iframe ref={pdfRef} style={{ display: 'none' }} title="print-pdf"></iframe>
    </div>
  );
};

export default GeneratePdfCheque;
