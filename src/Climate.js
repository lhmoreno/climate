import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import openwheather from './api/openwheather'

export default function Climate() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const dados = {
        appid: '30dda9507739dc1c6118ee6717715029',
        lang: {
            br: 'pt_br'
        },
        local: {
            name: 'blessing,tx,eua',
            coords: {
                lat: '-24.111440',
                lon: '-49.331844'
            }
        },
        temperature: {
            celsius: 'metric',
            fahrenheit: 'imperial',
            // Nada = Kelvin
        }
    }

    useEffect(() => {
        async function search() {
            const response = await openwheather.get('onecall', {
                params: {
                    appid: dados.appid,
                    lang: dados.lang.br,
                    lat: dados.local.coords.lat,
                    lon: dados.local.coords.lon,
                    units: dados.temperature.celsius
                }
            })
            const mili = response.data.current.dt * 1000

            const day = new Date(mili).getDate() < 10 ? '0' + new Date(mili).getDate() : new Date(mili).getDate()
            const month = new Date(mili).getMonth() + 1 < 10 ? '0' + (new Date(mili).getMonth() + 1) : new Date(mili).getMonth()
            const year = new Date(mili).getFullYear()

            const hours =  new Date(mili).getHours() < 10 ? '0' + new Date(mili).getHours() : new Date(mili).getHours()
            const minutes =  new Date(mili).getMinutes() < 10 ? '0' + new Date(mili).getMinutes() : new Date(mili).getMinutes()

            const obj = {
                dataHora: `${day}/${month}/${year} - ${hours}:${minutes}`,
                temperatura: `${Math.trunc(response.data.current.temp)}°C`,
                sensacao: `${Math.trunc(response.data.current.feels_like)}°C`,
                humidade: `${response.data.current.humidity}%`,
                descricao: `${response.data.current.weather[0].description}`,
                iconID: `${response.data.current.weather[0].icon}`
            }
            setData(obj)
            setLoading(false)
        }
        search()
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
          <View style={styles.container}>
            <Text>{data.dataHora}</Text>
            <Text>Tempo: {data.descricao}</Text>
            <Text>Temperatura: {data.temperatura}</Text>
            <Text>Sensação: {data.sensacao}</Text>
            <Text>Humidade: {data.humidade}</Text>
            
            <Image style={styles.image} source={{uri: `http://openweathermap.org/img/wn/${data.iconID}.png`}}/>
            <StatusBar style="auto" />
          </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      width: 50,
      height: 50
  }
});
