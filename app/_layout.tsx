import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import useAuthStore from "@/store/auth.store";

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore()

  const [fontsLoaded, error] = useFonts({
    "Raleway-Bold": require('../assets/fonts/Raleway-Bold.ttf'),
    "Raleway-Medium": require('../assets/fonts/Raleway-Medium.ttf'),
    "Raleway-Regular": require('../assets/fonts/Raleway-Regular.ttf'),
    "Raleway-SemiBold": require('../assets/fonts/Raleway-SemiBold.ttf'),
    "Raleway-Light": require('../assets/fonts/Raleway-Light.ttf'),
  });

  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  if(!fontsLoaded || isLoading) return null
  


  return <Stack screenOptions={{ headerShown: false }}/>;
}
