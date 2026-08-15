import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';

export default function SplashLoading() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.15,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.2,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={isDark ? ['#021A14', '#00110D'] : ['#FBF9F5', '#F5F1E8']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: 999,
          backgroundColor: isDark
            ? 'rgba(254,214,91,0.15)'
            : 'rgba(0,53,39,0.2)',
          transform: [{ scale }],
          opacity,
        }}
      />

      <View
        style={{
          alignItems: 'center',
          zIndex: 10,
          elevation: 10,
        }}
      >
        <Image
          source={require('../../assets/images/icon.png')}
          style={{ width: 140, height: 140 }}
          resizeMode='contain'
        />
      </View>

      <View style={{ position: 'absolute', bottom: 80 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: isDark ? '#FFFFFF' : '#003527',
          }}
        >
          Muslim Zone
        </Text>
      </View>
    </LinearGradient>
  );
}
