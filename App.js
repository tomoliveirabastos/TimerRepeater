import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export default function App() {

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  function toggle(){
    setIsActive(!isActive);
  }

  function reset(){
    setRemainingSecs(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);


  return (
    <View style={styles.container}>

    <ImageBackground 
      source={require("./assets/timer-animation.gif")}
      style={
        {
          backgroundColor: 'black', 
          opacity: 0.7,
          width: "100%",
          height: "100%",
          position: 'absolute'    
        }
      }/>

      <StatusBar barStyle="light-content" />
      
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>

      <TouchableOpacity onPress={() => toggle()} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>{isActive ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>

      {
      isActive ?  
      <TouchableOpacity onPress={()=>reset()} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>Resetar</Text>
      </TouchableOpacity>

      : false
      }

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderWidth: 1,
      backgroundColor: "rgba(0,0,0, 0.2)",
      borderColor: '#666',
      width: 110,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: '#999'
  },
  timerText: {
      position: 'absolute',
      top: 0,
      color: '#f1f1f1',
      fontSize: 70,
      marginBottom: 20,
  },
  buttonReset: {
      marginTop: 20,
      borderColor: "white"
  },
  buttonTextReset: {
    color: "white"
  }
});