import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const useLoadFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    'League Gothic Regular': require('../assets/fonts/LeagueGothic-Regular.ttf'),
                });
                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
            }
        };

        loadFonts();
    }, []);

    return fontsLoaded;
};

export const FONTS = {
    LeagueGothic: 'League Gothic Regular',
};