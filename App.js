import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
import { EditVetProfile } from './screens';
import BottomTabNav from './navigations/BottomTabNav';
import Rating from './screens/Rating';
import NumberOfClients from './screens/NumberOfClients';
import ShareTip from './screens/ShareTip';
import UpdateAvailability from './screens/UpdateAvailability';
import ViewVetProfile from "./screens/ViewVetProfile";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){
    return null
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName='BottomTabNavigation'
      >
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNav}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditVetProfile"
          component={EditVetProfile}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
        />
        <Stack.Screen
          name="NumberOfClients"
          component={NumberOfClients}
        />
        <Stack.Screen
          name="ShareTip"
          component={ShareTip}
        />
        <Stack.Screen
          name="UpdateAvailability"
          component={UpdateAvailability}
        />
        <Stack.Screen
          name="ViewVetProfile"
          component={ViewVetProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}