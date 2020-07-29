import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback, AsyncStorage } from 'react-native'
import openwheather from './api/openwheather'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location'

import TempDia from './components/TempDia'

export default function Climate({ navigation }) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [permission, setPermission] = useState(false)

    useFocusEffect(React.useCallback(() => {
        let isActive = true
        const dados = {
            appid: '30dda9507739dc1c6118ee6717715029',
            lang: {
                br: 'pt_br',
                en: 'en'
            },
            local: {
                name: '',
                coords: {
                    lat: '',
                    lon: ''
                }
            },
            temperature: {
                celsius: 'metric',
                fahrenheit: 'imperial',
                // Nada = Kelvin
            }
        }
        function setTemperatura(celsius, novaTem) {
            if (novaTem === 'Kelvin') {
                return `${Math.round(celsius + 273.15)}`
            }
            
            if (novaTem === 'Fahrenheit') {
                return `${Math.round((celsius * 9 / 5) + 32)}°`
            }
            
            return `${Math.round(celsius)}°`
        }
        
        function setVelocidade(ms, novaVel) {
            if (novaVel === 'mph') {
                return `${Math.round(ms * 2.237)} mph`
            }
            
            if (novaVel === 'km/h') {
                return `${Math.round(ms * 3.6)} km/h`
            }
            
            return `${Math.round(ms)} m/s`
        }
        
        async function search() {
            const { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
                return null
            } else {
                setPermission(true)
                const location = await Location.getCurrentPositionAsync({})
                dados.local.coords.lat = location.coords.latitude
                dados.local.coords.lon = location.coords.longitude
            }
            const config = {
                idioma: 'Português',
                temperatura: 'Celsius',
                velocidade: 'm/s'
            }
            const _storage = await AsyncStorage.getItem('config')
            if (_storage) {
                const configStorage = JSON.parse(_storage)
                config.idioma = configStorage.idioma
                config.temperatura = configStorage.temperatura
                config.velocidade = configStorage.velocidade
            }
            const response1 = await openwheather.get('weather', {
                params: {
                    appid: dados.appid,
                    lat: dados.local.coords.lat,
                    lon: dados.local.coords.lon
                }
            })
            const response2 = await openwheather.get('onecall', {
                params: {
                    appid: dados.appid,
                    lang: config.idioma === 'Português' ? dados.lang.br : dados.lang.en,
                    lat: dados.local.coords.lat,
                    lon: dados.local.coords.lon,
                    units: dados.temperature.celsius,
                    exclude: 'hourly'
                }
            })
            // const mili = response2.data.current.dt * 1000

            // const day = new Date(mili).getDate() < 10 ? '0' + new Date(mili).getDate() : new Date(mili).getDate()
            // const month = new Date(mili).getMonth() + 1 < 10 ? '0' + (new Date(mili).getMonth() + 1) : new Date(mili).getMonth()
            // const year = new Date(mili).getFullYear()

            // const hours =  new Date(mili).getHours() < 10 ? '0' + new Date(mili).getHours() : new Date(mili).getHours()
            // const minutes =  new Date(mili).getMinutes() < 10 ? '0' + new Date(mili).getMinutes() : new Date(mili).getMinutes()

            const obj = {
                // dataHora: `${day}/${month}/${year} - ${hours}:${minutes}`,
                temperatura: setTemperatura(response2.data.current.temp, config.temperatura),
                // sensacao: setTemperatura(response2.data.current.feels_like, config.temperatura),
                humidade: response2.data.current.humidity,
                descricao: response2.data.current.weather[0].description,
                clima: response2.data.current.weather[0].main,
                vento: setVelocidade(response2.data.current.wind_speed, config.velocidade),
                temp_min: setTemperatura(response2.data.daily[0].temp.min, config.temperatura),
                temp_max: setTemperatura(response2.data.daily[0].temp.max, config.temperatura),
                city: response1.data.name,
                horario: response2.data.current.sunset < response2.data.current.dt ? 'noite' : 'dia',
                idioma: config.idioma
            }
            setData(obj)
            setLoading(false)
        }
        search()
        return () => { isActive = false }
    }, []))
    
    function buttonConfig() {
        navigation.navigate('Settings')
    }
    
    if (loading) {
        if (!permission) {
            return (
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Precisamos de sua localização</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
    } else {
        return (
            <View style={styles.container}>
                <TempDia 
                    cidade={data.city}
                    clima={data.clima}
                    descricao={data.descricao}
                    temp={data.temperatura} 
                    temp_min={data.temp_min} 
                    temp_max={data.temp_max} 
                    humidade={data.humidade} 
                    vento={data.vento}
                    horario={data.horario}
                    lang={data.idioma}
                />
                <View style={styles.settingsContainer}>
                    <TouchableNativeFeedback 
                        background={TouchableNativeFeedback.Ripple('#a2a2a2', true)}
                        onPress={buttonConfig}
                    >
                        <View style={styles.settings}>
                            <Feather name="settings" size={30} color="white"/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsContainer: {
      position: "absolute",
      height: 80, 
      width: 80,
      top: 10,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff0'
    },
    settings: {
        height: 50, 
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
