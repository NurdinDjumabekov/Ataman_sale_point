////// tags
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////fns
import { getCategoryTT, getProductTT } from "../store/reducers/requestSlice";
import { clearListCategory } from "../store/reducers/requestSlice";
import { clearListProductTT } from "../store/reducers/requestSlice";
import { changeActiveSelectCategory } from "../store/reducers/stateSlice";
import { changeSearchProd } from "../store/reducers/stateSlice";
import { clearTemporaryData } from "../store/reducers/stateSlice";

///////components
import { EveryInvoiceSoputka } from "../components/Soputka/EveryInvoiceSoputka";

/////helpers
import { transformDate } from "../helpers/transformDate";

export const AddProdSoputkaSrceen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { forAddTovar } = route.params; //// хранятся данные накладной сапутки

  const { listCategory } = useSelector((state) => state.requestSlice);

  const { activeSelectCategory } = useSelector((state) => state.stateSlice);

  const { searchProd } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { seller_guid } = data;

  useEffect(() => {
    dispatch(clearTemporaryData()); // очищаю активный продукт
    navigation.setOptions({
      title: `${transformDate(new Date())}`,
    });
    dispatch(getCategoryTT({ seller_guid })); //// получаю все категории

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      //// очищаю список категорий и товаров
    };
  }, []);

  const listProdSale = () => {
    navigation.navigate("SoputkaProductScreen", {
      guidInvoice: forAddTovar?.invoice_guid,
    });
  };

  const onChangeCateg = (value) => {
    if (value !== activeSelectCategory) {
      dispatch(clearListProductTT()); //// очищаю список товаров перед отправкой запроса
      dispatch(changeActiveSelectCategory(value));
      dispatch(getProductTT({ category_guid: value, seller_guid }));
      /// хранение активной категории, для сортировки товаров(храню guid категории)
      clear();
    }
  };
  const clear = () => {
    dispatch(changeSearchProd(""));
    ////// очищаю поиск
    dispatch(clearTemporaryData());
    ////// очищаю временный данные для продажи
  };

  return (
    <View style={styles.parentBlock}>
      <TouchableOpacity onPress={listProdSale} style={styles.arrow}>
        <Text style={styles.textBtn}>Список товаров</Text>
        <View style={styles.arrowInner}></View>
      </TouchableOpacity>
      {searchProd?.length === 0 && (
        <>
          <Text style={styles.choiceCateg}>Выберите цех</Text>
          <View style={styles.blockSelect}>
            <RNPickerSelect
              onValueChange={onChangeCateg}
              items={listCategory}
              useNativeAndroidPickerStyle={false}
              value={activeSelectCategory}
              // placeholder={{}}
              style={styles}
            />
            <View style={styles.arrowSelect}></View>
          </View>
        </>
      )}
      <EveryInvoiceSoputka navigation={navigation} forAddTovar={forAddTovar} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
  },
  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(12, 169, 70, 0.486)",
    marginBottom: 0,
  },
  arrowInner: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },

  /////select

  choiceCateg: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    width: "96%",
    alignSelf: "center",
    paddingBottom: 3,
    marginTop: 10,
    paddingLeft: 2,
  },

  blockSelect: {
    width: "96%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
  },

  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },

  arrowSelect: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#222",
    height: 12,
    width: 12,
    borderRadius: 3,
    transform: [{ rotate: "135deg" }],
    position: "absolute",
    top: 14,
    right: 25,
  },
});
