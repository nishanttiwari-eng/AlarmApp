import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import AnalogClock from 'react-native-clock-analog';
import {Header, getTimeDifference} from '../Components/All';
import Colors from '../Components/Colors';

const nowDate = () => {
  const d = new Date();
  let second = d.getSeconds();
  let minute = d.getMinutes();
  let hour = d.getHours();
  let period = hour < 12 ? 'AM' : 'PM';
  return {second, minute, hour, period};
};

const nowTimer = () => {
  const {second, minute, hour, period} = nowDate();
  const [state, setState] = useState({
    second,
    minute,
    hour,
    period,
  });

  useEffect(() => {
    setInterval(() => {
      const {second, minute, hour, period} = nowDate();
      setState({second, minute, hour, period});
    }, 1000);
  }, [setState]);
  return state;
};

export default function Alarm(props) {
  const {alarmData} = props.route.params;
  const {second, minute, hour, period} = nowTimer();
  return (
    <View style={styles.container}>
      <Header isBack title={'Alarm'} />
      <View style={{alignSelf: 'center', marginTop: 100}}>
        <AnalogClock
          size={200}
          colorClock="#2196F3"
          colorNumber="#000000"
          autostart={true}
          colorCenter="#00BCD4"
          colorHour="#FF8F00"
          colorMinutes="#FFC400"
          hour={hour}
          minutes={minute}
          seconds={second}
          showSeconds={true}
        />
      </View>

      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          marginVertical: 20,
          fontSize: 30,
          fontWeight: 'bold',
        }}>
        {`${hour} : ${minute} : ${second < 10 ? `0${second}` : second}`}{' '}
        {period}
      </Text>

      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          marginVertical: 20,
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        {getTimeDifference(alarmData?.date)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },
});
