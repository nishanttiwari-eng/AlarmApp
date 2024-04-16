import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import {
  CustomButton,
  DateTimeView,
  Header,
  Input,
  SCREEN_HEIGHT,
  capitalizeOnlyFirstLetter,
} from '../Components/All';
import Colors from '../Components/Colors';
const AddReminderScreen = ({navigation}) => {
  const [deviceToken, setDeviceToken] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const validateReminder = () => {
    try {
      if (title == '') {
        Alert.alert('Alert', 'Please enter title');
      } else if (date == '') {
        Alert.alert('Alert', 'Please select date and time');
      } else {
        saveReminder();
      }
    } catch (error) {
      Alert.alert('Alert', error.message);
    }
  };

  const saveReminder = async () => {
    try {
      const reminder = {title, date};
      const reminders = await AsyncStorage.getItem('reminders');
      if (reminders !== null) {
        const parsedReminders = JSON.parse(reminders);
        const updatedReminders = [...parsedReminders, reminder];
        await AsyncStorage.setItem(
          'reminders',
          JSON.stringify(updatedReminders),
        );
      } else {
        await AsyncStorage.setItem('reminders', JSON.stringify([reminder]));
      }
      scheduleReminder(title);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Save Reminder Error : ', error.message);
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
  };

  const scheduleReminder = () => {
    try {
      PushNotification.localNotification({
        title: 'Reminder set successfully',
        message: capitalizeOnlyFirstLetter(title),
        channelId: 'alarm',
        soundName: 'default',
        number: 1,
        userInfo: {date, title, time},
      });
    } catch (error) {
      Alert.alert('Oops!', error.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header isBack title={'Add New Reminder'} />

      <Input
        placeholder="Enter title"
        value={title}
        onChangeText={text => setTitle(text)}
        containerStyle={{marginTop: SCREEN_HEIGHT / 3.5}}
      />
      <DateTimeView date={date} onPress={() => setDatePickerVisible(true)} />

      <CustomButton title="Save Reminder" onPress={() => validateReminder()} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        maximumDate={new Date().setFullYear(new Date().getFullYear() + 10)} // next five years
        minimumDate={new Date(Date.now())}
        date={date != '' ? new Date(date) : new Date(Date.now())}
        mode="datetime"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => hideDatePicker()}
      />
    </View>
  );
};

export default AddReminderScreen;
