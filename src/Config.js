import React, { useState, useEffect } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableWithoutFeedback, 
  TouchableNativeFeedback, 
  AsyncStorage, 
  BackHandler 
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'

export default function Config({ navigation }) {
  const [data, setData] = useState({})
  const [idioma, setIdioma] = useState('')
  const [temperatura, setTemperatura] = useState('')
  const [velocidade, setVelocidade] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const palavrasPt = {
      idioma: 'Idioma',
      idiomaDes: 'Escolha seu idioma preferido',
      temperatura: 'Temperatura',
      temperaturaDes: 'Escolha sua medida de temperatura',
      velocidade: 'Velocidade do vento',
      velocidadeDes: 'Escolha a forma de medir a velocidade',
      direitos: 'Direitos Autorais (c) 2020 Luiz Henrique Moreno'
    }
  
    const palavrasEn = {
      idioma: 'Language',
      idiomaDes: 'Choose your preferred language',
      temperatura: 'Temperature',
      temperaturaDes: 'Choose your temperature scale',
      velocidade: 'Wind speed',
      velocidadeDes: 'Choose how to measure speed',
      direitos: 'Copyright (c) 2020 Luiz Henrique Moreno'
    }
    
    const dataInitial = {
      idioma: 'Português',
      temperatura: 'Celsius',
      velocidade: 'km/h',
      palavras: palavrasPt
    }

    AsyncStorage.getItem('config', (error, result) => {
      const obj = JSON.parse(result)
      if (obj) {
        if (obj.idioma === 'Português') {
          dataInitial.idioma = obj.idioma
          dataInitial.temperatura = obj.temperatura
          dataInitial.velocidade = obj.velocidade
          dataInitial.palavras = palavrasPt
          setData(dataInitial)
          setIdioma('pt')
          setTemperatura(obj.temperatura.toLowerCase())
          setVelocidade(obj.velocidade)
        } else {
          dataInitial.idioma = obj.idioma
          dataInitial.temperatura = obj.temperatura
          dataInitial.velocidade = obj.velocidade
          dataInitial.palavras = palavrasEn
          setData(dataInitial)
          setIdioma('en')
          setTemperatura(obj.temperatura.toLowerCase())
          setVelocidade(obj.velocidade)
        }
      } else {
        setData(dataInitial)
        setIdioma('pt')
        setTemperatura('celsius')
        setVelocidade('km/h')
      }
    }).then(() => setLoading(false))
  }, [])

  useFocusEffect(() => {
    const onBackPress = () => {
      const obj = {
        idioma: data.idioma,
        temperatura: data.temperatura,
        velocidade
      }
      AsyncStorage.setItem('config', JSON.stringify(obj))
      return false
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [])

  function pressIdioma() {
    if (idioma === 'en') {
      const obj = data
      obj.idioma = 'Português'
      obj.palavras = {
        idioma: 'Idioma',
        idiomaDes: 'Escolha seu idioma preferido',
        temperatura: 'Temperatura',
        temperaturaDes: 'Escolha sua medida de temperatura',
        velocidade: 'Velocidade do vento',
        velocidadeDes: 'Escolha a forma de medir a velocidade',
        direitos: 'Direitos Autorais (c) 2020 Luiz Henrique Moreno'
      }
      setData(obj)
      setIdioma('pt')
    } else {
      const obj = data
      obj.idioma = 'English'
      obj.palavras = {
        idioma: 'Language',
        idiomaDes: 'Choose your preferred language',
        temperatura: 'Temperature',
        temperaturaDes: 'Choose your temperature scale',
        velocidade: 'Wind speed',
        velocidadeDes: 'Choose how to measure speed',
        direitos: 'Copyright (c) 2020 Luiz Henrique Moreno'
      }
      setData(obj)
      setIdioma('en')
    }
  }

  function pressTemperatura() {
    if (temperatura === 'fahrenheit') {
      const obj = data
      obj.temperatura = 'Kelvin'
      setData(obj)
      setTemperatura('kelvin')
      return
    }
    if (temperatura === 'kelvin') {
      const obj = data
      obj.temperatura = 'Celsius'
      setData(obj)
      setTemperatura('celsius')
      return
    } 
    const obj = data
    obj.temperatura = 'Fahrenheit'
    setData(obj)
    setTemperatura('fahrenheit')
  }

  function pressVelocidade() {
    if (velocidade === 'km/h') {
      const obj = data
      obj.velocidade = 'mph'
      setData(obj)
      setVelocidade('mph')
      return
    }
    if (velocidade === 'mph') {
      const obj = data
      obj.velocidade = 'm/s'
      setData(obj)
      setVelocidade('m/s')
      return
    }
    const obj = data
    obj.velocidade = 'km/h'
    setData(obj) 
    setVelocidade('km/h')
  }

  async function pressBack() {
    const obj = {
      idioma: data.idioma,
      temperatura: data.temperatura,
      velocidade
    }
    await AsyncStorage.setItem('config', JSON.stringify(obj))
    navigation.navigate('Home')
  }

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
      <View style={styles.container}>
          <StatusBar style="black" translucent={false} backgroundColor="white"/>
          <View style={styles.header}> 
            <TouchableWithoutFeedback onPress={() => pressBack()}>
              <View style={styles.iconBack}>
                <Ionicons 
                  name="md-arrow-round-back" 
                  size={24} color="black" 
                />
              </View>   
            </TouchableWithoutFeedback> 
            <Text style={styles.title}>Climate</Text>
            <View style={styles.iconBack}></View>
          </View>

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('#a2a2a2', false)} 
            onPress={() => pressIdioma()}
          >
            <View style={styles.settingContainer}>
              <MaterialIcons name="language" size={24} color="black" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{`${data.palavras.idioma} - ${data.idioma}`}</Text>
                <Text style={styles.settingDescription}>{data.palavras.idiomaDes}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('#a2a2a2', false)}
            onPress={() => pressTemperatura()}
          >
            <View style={styles.settingContainer}>
              <MaterialCommunityIcons name={`temperature-${temperatura}`} size={24} color="black" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{`${data.palavras.temperatura} - ${data.temperatura}`}</Text>
                <Text style={styles.settingDescription}>{data.palavras.temperaturaDes}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('#a2a2a2', false)}
            onPress={() => pressVelocidade()}
          >
            <View style={styles.settingContainer}>
              <Ionicons name="md-speedometer" size={24} color="black" />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{`${data.palavras.velocidade} - ${data.velocidade}`}</Text>
                <Text style={styles.settingDescription}>{data.palavras.velocidadeDes}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          <View style={styles.direitosContainer}>
            <Text style={styles.direitosText}>{data.palavras.direitos}</Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  iconBack: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontFamily: 'JosefinSans_700Bold'
  },
  settingContainer: {
    flexDirection: 'row',
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 15,
    // backgroundColor: 'green'
  },
  settingTextContainer: {
    marginLeft: 15
  },
  settingTitle: {
    fontWeight: '600',
    fontSize: 18
  },
  settingDescription: {
    color: '#A2A2A2',
    fontSize: 15
  },
  direitosContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dedede'
  },
  direitosText: {
    fontWeight: 'bold',
    fontSize: 15
  }
});
