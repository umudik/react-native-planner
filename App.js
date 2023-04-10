import { useState, useCallback } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { Provider as PaperProvider, Appbar, List, FAB, Portal, Modal, Divider, Chip } from 'react-native-paper';
import Constants from 'expo-constants';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { PlannerList } from "./components/List"
const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);


  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );
  const addTodo = () => {
    setTodos([...todos, text]);
    setText('');
  };


  function CreateEvent() {
    return (
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={14}
      />
    )
  }


  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Todo List" />
        </Appbar.Header>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add todo"
            value={text}
            onChangeText={(value) => setText(value)}
          />
          <Button title="Add" onPress={addTodo} />
        </View>
        <PlannerList />
      </View>
      <View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setVisible(true)}
        />
      </View>



    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,

    borderRadius: 100,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
  modal: { backgroundColor: 'red', padding: 20 }
});


export default App;








