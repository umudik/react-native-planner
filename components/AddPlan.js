import * as Fookie from "fookie";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Checkbox,
  Button,
  Title,
  Subheading,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default ({ visible, onDismiss }) => {
  const [eventName, setEventName] = useState("");
  const [selectedDays, setSelectedDays] = useState(
    Array.from({ length: 7 }, () => false)
  );
  const [selectedTimes, setSelectedTimes] = useState([new Date()]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const toggleDay = (index) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDays(newSelectedDays);
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setSelectedTimes([...selectedTimes, selectedDate]);
    }
  };

  const removeTime = (index) => {
    const newSelectedTimes = selectedTimes.filter((_, i) => i !== index);
    setSelectedTimes(newSelectedTimes);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <Title>Yeni Alarm Ekle</Title>
        <TextInput
          label="Alarm İsmi"
          value={eventName}
          onChangeText={setEventName}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <Subheading>Haftanın Günleri</Subheading>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity key={day} onPress={() => toggleDay(index)}>
              <View style={{ alignItems: "center" }}>
                <Checkbox.Android
                  status={selectedDays[index] ? "checked" : "unchecked"}
                  onPress={() => toggleDay(index)}
                />
                <Text>{day}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Subheading>Çalma Saatleri</Subheading>
        {selectedTimes.map((time, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Button onPress={() => setShowTimePicker(true)}>
              {time.toLocaleTimeString()}
            </Button>
            <Button onPress={() => removeTime(index)} color="red">
              X
            </Button>
          </View>
        ))}
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <Button
          mode="contained"
          onPress={() => {
            // Burada alarmı kaydetme işlemini gerçekleştirin
            onDismiss();
          }}
          style={{ marginTop: 20 }}
        >
          Alarmı Ekle
        </Button>
      </Modal>
    </Portal>
  );
};
