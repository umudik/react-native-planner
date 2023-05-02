import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
} from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  List,
  FAB,
  Portal,
  Divider,
  Chip,
} from "react-native-paper";
import Constants from "expo-constants";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import { PlannerList } from "./components/List";
import * as Fookie from "fookie";
import AddPlan from "./components/AddPlan";
import Event from "./src/model/event";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(async () => {
    await Event();
    const res = await Fookie.Core.run({
      model: "event",
      method: Fookie.Method.Read,
    });
    setEvents(res.data);
    console.log(res.data);
  }, events);

  function CreateEvent() {
    return (
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={14}
      />
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView>
          <PlannerList events={events} />
        </ScrollView>
      </View>
      <View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setVisible(true)}
        />
      </View>
      <AddPlan
        visible={visible}
        onHideDialog={setVisible}
        setEvents={setEvents}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,

    borderRadius: 100,
    bottom: 0,
    backgroundColor: "#2196F3",
  },
  modal: { backgroundColor: "red", padding: 20 },
});

export default App;
