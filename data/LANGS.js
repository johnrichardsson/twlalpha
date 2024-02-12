import * as React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const LANGS = [
    {
    id: '001ISO3166trktur',
    title: 'Turkish',
    titlecap: 'TURKISH',
    titlen: 'Türkçe',
    color: '#ba4c34',
    family1: 'Oghuz',
    family2: 'Turkic',
    image: require('../Intro/Image/tur.png'),
    navigateTo: 'TurkishMain',
    },
    {
    id: '002ISO3166gemdeu',
    title: 'German',
    titlecap: 'GERMAN',
    titlen: 'Deutsch',
    color: '#ba7c34',
    family1: 'Germanic',
    family2: 'Indo-European',
    image: require('../Intro/Image/deu.jpg'),
    navigateTo: 'GermanMain',
    },
    {
    id: '003ISO3166trkaze',
    title: 'Azerbaijani',
    titlecap: 'AZERBAIJANI',
    titlen: 'Azərice',
    color: '#34a2ba',
    family1: 'Oghuz',
    family2: 'Turkic',
    image: require('../Intro/Image/aze.png'),
    navigateTo: 'AzerbaijaniMain',
    },
    {
    id: '004ISO3166irakmr',
    title: 'Kurmanji',
    titlecap: 'KURMANJI',
    titlen: 'Kurmancî',
    color: '#b7ba34',
    family1: 'Iranic',
    family2: 'Indo-European',
    image: require('../Intro/Image/kmr.png'),
    navigateTo: 'KurmanjiMain',
    },
    {
    id: '005ISO3166trktuk',
    title: 'Turkmen',
    titlecap: 'TURKMEN',
    titlen: 'Türkmençe',
    color: '#34833a',
    family1: 'Oghuz',
    family2: 'Turkic',
    image: require('../Intro/Image/tuk.png'),
    navigateTo: 'TurkmenMain',
    },
];

export default LANGS