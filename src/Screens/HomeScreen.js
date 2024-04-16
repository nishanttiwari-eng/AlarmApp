import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {EmptyMessage, Header, ReminderView} from '../Components/All';
import Colors from '../Components/Colors';
import {useFirbaseSetup} from './firbaseSetup';

const HomeScreen = ({navigation}) => {
  const [reminders, setReminders] = useState([]);

  const {deviceToken} = useFirbaseSetup();

  console.log('deviceToken----------', deviceToken);

  useFocusEffect(
    React.useCallback(() => {
      fetchReminders();
    }, []),
  );

  const fetchReminders = async () => {
    try {
      const remindersData = await AsyncStorage.getItem('reminders');
      if (remindersData !== null) {
        console.log('reminder----', remindersData);
        setReminders(JSON.parse(remindersData));
      }
    } catch (error) {
      Alert.alert('Alert', error.message);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={'Home Screen'} />
      <FlatList
        data={reminders}
        renderItem={({item}) => <ReminderView item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <EmptyMessage message={'No reminder added yet!'} />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddReminder')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: Colors.blackGray,
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 24}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
