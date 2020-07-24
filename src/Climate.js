import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import openwheather from './api/openwheather'

import TempDia from './components/TempDia'

export default function Climate() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const dados = {
        appid: '30dda9507739dc1c6118ee6717715029',
        lang: {
            br: 'pt_br'
        },
        local: {
            name: '',
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
                    lang: dados.lang.br,
                    lat: dados.local.coords.lat,
                    lon: dados.local.coords.lon,
                    units: dados.temperature.celsius
                }
            })
            const mili = response2.data.current.dt * 1000

            const day = new Date(mili).getDate() < 10 ? '0' + new Date(mili).getDate() : new Date(mili).getDate()
            const month = new Date(mili).getMonth() + 1 < 10 ? '0' + (new Date(mili).getMonth() + 1) : new Date(mili).getMonth()
            const year = new Date(mili).getFullYear()

            const hours =  new Date(mili).getHours() < 10 ? '0' + new Date(mili).getHours() : new Date(mili).getHours()
            const minutes =  new Date(mili).getMinutes() < 10 ? '0' + new Date(mili).getMinutes() : new Date(mili).getMinutes()

            const obj = {
                dataHora: `${day}/${month}/${year} - ${hours}:${minutes}`,
                temperatura: Math.trunc(response2.data.current.temp),
                sensacao: Math.trunc(response2.data.current.feels_like),
                humidade: response2.data.current.humidity,
                descricao: response2.data.current.weather[0].description,
                clima: response2.data.current.weather[0].main,
                vento: response2.data.current.wind_speed,
                temp_min: response2.data.daily[0].temp.min,
                temp_max: response2.data.daily[0].temp.max,
                city: response1.data.name,
                horario: response2.data.current.sunset < response2.data.current.dt ? 'noite' : 'dia'
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
            </View>
        )
    } else {
        return (
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
            />
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
      width: 50,
      height: 50
  }
});
