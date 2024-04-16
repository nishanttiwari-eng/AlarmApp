import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Colors from './Colors';
import {useNavigation} from '@react-navigation/native';
import {dynamicSize, getFontSize} from './DynamicSize';
import {useSelector} from 'react-redux';
import moment from 'moment';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const genrateRandomNumber = () => {
  try {
    return Math.floor(Math.random() * 9000000000) + 1;
  } catch (error) {
    console.log('error------', error.message);
  }
};

export const EmptyMessage = props => {
  const isDarkMode = useColorScheme() == 'dark';
  const {message, styles} = props;
  return (
    <View
      style={[
        {
          height: SCREEN_HEIGHT - 150,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      <Text
        style={{
          fontSize: 23,
          alignSelf: 'center',
          color: Colors.black,
        }}>
        {message}
      </Text>
    </View>
  );
};

export const getTimeDifference = (currentTime, alarmTime) => {
  const currentMoment = moment(currentTime);
  const alarmMoment = moment(alarmTime);

  const timeDifference = moment.duration(alarmMoment.diff(currentMoment));

  const days = timeDifference.days();
  const hours = timeDifference.hours();
  const minutes = timeDifference.minutes();

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} until alarm`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} until alarm`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} until alarm`;
  } else {
    return 'Alarm is due now!';
  }
};

export const ReminderView = props => {
  const navigation = useNavigation();
  const {item} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Alarm', {alarmData: item})}
      {...props}
      style={{
        width: '90%',
        borderRadius: 5,
        backgroundColor: 'gray',
        marginVertical: 5,
        alignSelf: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Text style={styles.headingStyle}>
        Title : {''}
        <Text style={styles.titleStyle}>
          {capitalizeOnlyFirstLetter(item.title)}
        </Text>
      </Text>
      <Text style={styles.headingStyle}>
        Date : {''}
        <Text style={styles.titleStyle}>
          {item.date
            ? moment(item.date).format('DD - MMMM - yyyy , hh : mm A')
            : ''}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export const CustomButton = props => {
  const {title, titleTextStyle, containerStyle} = props;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[styles.buttonView, containerStyle]}>
      <Text style={[styles.customBtnTextStyle, titleTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Header = props => {
  const navigation = useNavigation();
  const {title, isBack} = props;
  const height = dynamicSize(45);

  return (
    <View
      style={{
        height: height,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blackGray,
        width: '100%',
        paddingLeft: 15,
      }}>
      {isBack && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            width: '10%',
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png',
            }}
            style={[styles.headerIconStyle, {tintColor: Colors.black}]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          paddingLeft: 8,
          fontWeight: 'bold',
          color: Colors.black,
          fontSize: getFontSize(15),
        }}>
        {title}
      </Text>
    </View>
  );
};

export const Input = props => {
  const {containerStyle} = props;
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <TextInput
        placeholderTextColor={Colors.black}
        {...props}
        style={styles.inputStyle}
      />
      {props.error && (
        <Text
          style={{
            textAlign: 'left',
            marginLeft: SCREEN_WIDTH / 2.1,
            color: Colors.red,
            fontSize: getFontSize(11),
          }}>
          {props.error}
        </Text>
      )}
    </View>
  );
};
export const DateTimeView = props => {
  const darkMode = useColorScheme() == 'dark';
  const {date} = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{
        borderColor: Colors.black,
        backgroundColor: Colors.white,
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: 'center',
        paddingLeft: 12,
        height: 50,
        width: '80%',
      }}>
      <Text
        style={[
          {
            fontSize: 13,
            color: Colors.black,
          },
        ]}>
        {date
          ? moment(date).format('DD-MMM-YYYY , hh:mm A')
          : 'Select data and time'}
      </Text>
    </TouchableOpacity>
  );
};
export const capitalizeOnlyFirstLetter = letter => {
  try {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  } catch (error) {
    console.log('capitalizeOnlyFirstLetter Error : ', error.message);
  }
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 20,
    height: dynamicSize(50),
    color: Colors.black,
    width: '100%',
    borderRadius: 5,
  },

  containerStyle: {
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    height: dynamicSize(50),
    width: '80%',
  },

  buttonView: {
    width: '80%',
    height: dynamicSize(40),
    backgroundColor: Colors.blackGray,
    borderRadius: 3,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnTextStyle: {
    fontSize: getFontSize(13),
    fontWeight: 'bold',
    color: Colors.white,
  },

  headerIconStyle: {
    height: dynamicSize(25),
    width: dynamicSize(25),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 8,
    fontSize: 13,
  },
  category: {
    marginVertical: 5,
    fontSize: 10,
  },
  image: {
    width: 110,
    height: 120,
  },
  titleStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  headingStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
