import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

const senderID = '521635284520';

export const useFirbaseSetup = props => {
  const [deviceToken, setDeviceToken] = useState(null);
  const navigation = useNavigation();
  console.log('navigation-', navigation);
  useEffect(() => {
    notificationMain();
  }, []);

  const notificationMain = async () => {
    await PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:------------', token.token);
        setDeviceToken(token.token);
        AsyncStorage.setItem('PushToken', JSON.stringify(token.token));
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:====>', notification);
        console.log('userInteraction====>' + notification.userInteraction);
        if (notification.userInteraction) {
          if (notification.data) {
            navigation.navigate('Alarm', {alarmData: notification.data});
          }
        }
      },

      senderID: senderID,
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'alarm',
        channelName: 'channel name',
        channelDescription: 'Channel for reminder notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('from_quit_state:===>', remoteMessage);
          // Notification caused app to open from quit state:
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log(
        'Notification caused notification to handle from foreground state:',
        remoteMessage,
      );
    });
  };

  return {deviceToken};
};
