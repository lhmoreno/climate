import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, ImageBackground, View } from 'react-native'
import { StatusBar, setStatusBarBackgroundColor } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons'

export default function TempDia(props) {
    const [image, setImage] = useState()

    const data = {
        Clear: {
            dia: ['#FCA13CDD', require('../assets/clearDia.png')],
            noite: ['#146C7E', require('../assets/clearNoite.png')]
        },
        Thunderstorm: {
            dia: ['#5494E0DD', require('../assets/rain.png')],
            noite: ['#5494E0DD', require('../assets/rain.png')]
        },
        Drizzle: {
            dia: ['#5494E0DD', require('../assets/rain.png')],
            noite: ['#5494E0DD', require('../assets/rain.png')]
        },
        Rain: {
            dia: ['#5494E0DD', require('../assets/rain.png')],
            noite: ['#5494E0DD', require('../assets/rain.png')]
        },
        Snow: {
            dia: ['#66C2FBBB', require('../assets/snow.png')],
            noite: ['#66C2FBBB', require('../assets/snow.png')]
        },
        Mist: {
            dia: ['#66C2FBBB', require('../assets/fog.png')],
            noite: ['#66C2FBBB', require('../assets/fog.png')]
        },
        Fog: {
            dia: ['#66C2FBBB', require('../assets/fog.png')],
            noite: ['#66C2FBBB', require('../assets/fog.png')]
        },
        Squall: {
            dia: ['#66C2FBBB', require('../assets/fog.png')],
            noite: ['#66C2FBBB', require('../assets/fog.png')]
        },
        Smoke: {
            dia: ['#3A7BD5', require('../assets/cloud.png')],
            noite: ['#3A7BD5', require('../assets/cloud.png')]
        },
        Haze: {
            dia: ['#3A7BD5', require('../assets/cloud.png')],
            noite: ['#3A7BD5', require('../assets/cloud.png')]
        },
        Clouds: {
            dia: ['#3A7BD5', require('../assets/cloud.png')],
            noite: ['#3A7BD5', require('../assets/cloud.png')]
        },
        Dust: {
            dia: ['#8F94FB', require('../assets/wind.png')],
            noite: ['#8F94FB', require('../assets/wind.png')]
        },
        Sand: {
            dia: ['#8F94FB', require('../assets/wind.png')],
            noite: ['#8F94FB', require('../assets/wind.png')]
        },
        Ash: {
            dia: ['#8F94FB', require('../assets/wind.png')],
            noite: ['#8F94FB', require('../assets/wind.png')]
        },
        Tornado: {
            dia: ['#8F94FB', require('../assets/wind.png')],
            noite: ['#8F94FB', require('../assets/wind.png')]
        }
    }

    useEffect(() => {
        if(data[`${props.clima}`]) {
            if(data[`${props.clima}`][`${props.horario}`]){
                const backgroundStatus = data[`${props.clima}`][`${props.horario}`][0]
                const backgroundImage = data[`${props.clima}`][`${props.horario}`][1]

                setStatusBarBackgroundColor(backgroundStatus, false)
                setImage(backgroundImage)
            }
        }
    }, [props])

    if(data[`${props.clima}`]) {
        if(data[`${props.clima}`][`${props.horario}`]){
            
        } else {
            return <Text>Parametros errados!</Text>
        }
    } else {
        return <Text>Parametros errados!</Text>
    }


    return (
        <ImageBackground 
            source={image}
            style={styles.container}
            resizeMode="stretch"
        >
            <StatusBar style="light" translucent={false} backgroundColor={'black'}/>

            <View style={styles.primeiro}>
                <View style={styles.local}>
                    <Entypo name="location-pin" size={20} color="white"/>
                    <Text style={styles.cidade}>{props.cidade}</Text>
                </View>
                <Text style={styles.temp}>{props.temp}</Text>
                <Text style={styles.clima}>{props.descricao}</Text>
            </View>

            <View style={styles.segundo}>
                <View style={styles.row}>
                    <View style={styles.dado}>
                        <Text style={styles.dados}>{props.temp_min}</Text>
                        <Text style={styles.descricao}>MIN</Text>
                    </View>

                    <View style={styles.dado}>
                        <Text style={styles.dados}>{props.temp_max}</Text>
                        <Text style={styles.descricao}>MAX</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.dado}>
                        <Text style={styles.dados}>{props.humidade}%</Text>
                        <Text style={styles.descricao}>{props.lang === 'Português' ? 'HUMIDADE' : 'HUMIDITY'}</Text>
                    </View>

                    <View style={styles.dado}>
                        <Text style={styles.dados}>{props.vento}</Text>
                        <Text style={styles.descricao}>{props.lang === 'Português' ? 'VENTO' : 'WIND'}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    primeiro: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    local: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    segundo: {
        marginBottom: 40
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dado: {
        alignItems: 'center',
        marginTop: 25
    },
    cidade: {
        fontFamily: 'JosefinSans_700Bold',
        fontSize: 20,
        color: 'white'
    },
    temp: {
        fontFamily: 'JosefinSans_700Bold',
        fontSize: 80,
        lineHeight: 80,
        color: 'white'
    },
    clima: {
        fontFamily: 'JosefinSans_300Light',
        fontSize: 36,
        lineHeight: 36,
        color: 'white'
    },
    dados: {
        fontFamily: 'JosefinSans_700Bold',
        fontSize: 36,
        color: 'white'
    },
    descricao: {
        fontFamily: 'JosefinSans_300Light',
        fontSize: 14,
        color: 'white'
    }
  })