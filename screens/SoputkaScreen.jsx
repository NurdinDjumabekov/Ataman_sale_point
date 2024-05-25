import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////tags
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";

/////components
import { AllHistoryInvoice } from "../common/AllHistoryInvoice";
import { ModalCreateSoputka } from "../components/Soputka/ModalCreateSoputka";
import { ViewButton } from "../customsTags/ViewButton";

/////redux
import { changeLocalData } from "../store/reducers/saveDataSlice";
import {
  clearListCategory,
  createInvoiceSoputkaTT,
} from "../store/reducers/requestSlice";
import { clearListProductTT } from "../store/reducers/requestSlice";
import { getHistorySoputka } from "../store/reducers/requestSlice";
import { getListAgents } from "../store/reducers/requestSlice";

/////helpers
import { getLocalDataUser } from "../helpers/returnDataUser";

export const SoputkaScreen = ({ navigation }) => {
  //// Сопутка
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listHistorySoputka } = useSelector(
    (state) => state.requestSlice
  );

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getHistorySoputka(data?.seller_guid));
    await dispatch(getListAgents(data?.seller_guid));
  };

  useEffect(() => {
    getData();

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      //// очищаю список категорий и товаров
    };
  }, []);

  const createInvoice = () => {
    const { seller_guid } = data;
    const dataObj = {
      comment: "",
      seller_guid,
      agent_guid: "B3120F36-3FCD-4CA0-8346-484881974846",
    };
    dispatch(createInvoiceSoputkaTT({ navigation, dataObj }));
    ////// создаю заявку для отправки списка товаров, которые нужны ТТ
  };

  const { listAgents } = useSelector((state) => state.requestSlice);

  console.log(listAgents, "listAgents");

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.soputkaBlock}>
          <ViewButton styles={styles.soputka} onclick={createInvoice}>
            + Создать заявку
          </ViewButton>
        </View>
        <View style={styles.selectBlock}>
          <Text style={styles.title}>История ваших заявок</Text>
          <FlatList
            data={listHistorySoputka}
            renderItem={({ item, index }) => (
              <AllHistoryInvoice
                item={item}
                index={index}
                keyLink={"SoputkaProdHistoryScreen"}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => `${item.guid}${index}`}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          />
        </View>
      </SafeAreaView>
      {/* <ModalCreateSoputka
        modalState={modalState}
        setModalState={setModalState}
        navigation={navigation}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    color: "#fff",
    marginBottom: 5,
  },

  selectBlock: {
    height: "88%",
  },

  soputkaBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },

  soputka: {
    fontSize: 18,
    color: "#fff",
    minWidth: "95%",
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 8,
    fontWeight: 600,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 20,
    marginBottom: 20,
  },

  everyProd: {
    padding: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(212, 223, 238, 0.47)",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.107)",
  },

  everyProdInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  blockTitle: {
    width: "67%",
  },

  blockTitleInner: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },

  comment: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
  },
});
