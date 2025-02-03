////// hooks
import React, { useState } from 'react';

///// tags & components
import { Document, Page, Text, View, PDFViewer, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

////// icons
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CloseIcon from '@mui/icons-material/Close';

////// style
import { styled } from '@mui/material/styles';
import { styles } from './style';
import './style.scss';

////// helpers
import { myAlert } from 'helpers/myAlert';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const GeneratePdfInvoice = ({ listInvoice }) => {
  const printPdf = () => {
    if (listInvoice?.length == 0) return myAlert('У вас пустой список!', 'error');
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const qrCodeBase64 = QRCode.toDataURL('00EF312C-0087-4240-902C-C01489FF5298-2025-02-03T10:37:20.220Z');

  return (
    <div className="generateBlock">
      <button className="activePdf" onClick={printPdf}>
        <FileCopyIcon />
        <p>Распечатать накладные</p>
      </button>

      <BootstrapDialog
        onClose={handleClose}
        sx={{
          '& > div:nth-of-type(3)': {
            '& > div:nth-of-type(1)': {
              width: 780,
              maxWidth: 780
            }
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, pr: 10, fontSize: 16 }} id="customized-dialog-title">
          Список накладных
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ height: '85vh', width: '100%', overflow: 'hidden' }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <Document>
              {listInvoice?.map((item) => {
                const totalPages = Math.ceil(item?.prods?.length / 45);
                const productChunks = Array.from({ length: totalPages }, (v, i) => item?.prods?.slice(i * 45, (i + 1) * 45));

                let productNumber = 1;

                return productChunks?.map((chunk, pageIndex) => (
                  <Page key={`${item?.invoice_guid}-${pageIndex}`} size="A4" style={styles.page}>
                    <View style={styles.section}>
                      {/* Заголовок накладной отображается только на первой странице */}
                      {pageIndex === 0 && (
                        <>
                          <Text style={styles.header}>{item?.order_point_name}</Text>
                          <Text style={styles.header}>{item?.point_name}</Text>
                          <View style={styles.viewQRCode}>
                            <Image src={qrCodeBase64} style={{ width: 50, height: 50 }} />
                          </View>
                        </>
                      )}
                    </View>

                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.numsTitle]}>
                          <Text style={[styles.textTitle, styles.nums]}>№</Text>
                        </View>
                        <View style={[styles.tableCol, styles.names]}>
                          <Text style={styles.textTitle}>Наименование</Text>
                        </View>
                        <View style={[styles.tableCol, styles.headersOther]}>
                          <Text style={styles.textTitle}>Ед. изм.</Text>
                        </View>
                        <View style={[styles.tableCol, styles.headersOther]}>
                          <Text style={styles.textTitle}>Кол-во</Text>
                        </View>
                        <View style={[styles.tableCol, styles.headersOther]}>
                          <Text style={styles.textTitle}>Цена</Text>
                        </View>
                        <View style={[styles.tableCol, styles.headersOther]}>
                          <Text style={styles.textTitle}>Сумма</Text>
                        </View>
                      </View>
                      {chunk?.map((i) => (
                        <View style={styles.tableRow} key={i?.codeid}>
                          <View style={[styles.tableCol, styles.numsMain]}>
                            <Text style={[styles.tableCell, { textAlign: 'center' }]}>{productNumber++}</Text>
                          </View>
                          <View style={[styles.tableCol, styles.namesInner]}>
                            <Text style={[styles.tableCell, styles.numsInnerText]}>{i?.product_name}</Text>
                          </View>
                          <View style={[styles.tableCol, styles.headersOther]}>
                            <Text style={styles.tableCell}>{i?.unit}</Text>
                          </View>
                          <View style={[styles.tableCol, styles.headersOther]}>
                            <Text style={styles.tableCell}>{i?.count}</Text>
                          </View>
                          <View style={[styles.tableCol, styles.headersOther]}>
                            <Text style={styles.tableCell}>{i?.price} сом</Text>
                          </View>
                          <View style={[styles.tableCol, styles.headersOther]}>
                            <Text style={styles.tableCell}>{i?.total} сом</Text>
                          </View>
                        </View>
                      ))}

                      {pageIndex === totalPages - 1 && (
                        <View style={{ marginTop: 20, marginRight: 5, alignItems: 'flex-end' }}>
                          <Text style={styles.textTitle}>Кол-во: {item?.total_count}</Text>
                          <Text style={styles.textTitle}>Сумма: {item?.total_price} сом</Text>
                        </View>
                      )}
                    </View>
                  </Page>
                ));
              })}
            </Document>
          </PDFViewer>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default GeneratePdfInvoice;
