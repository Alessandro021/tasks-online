import { createStackNavigator , CardStyleInterpolators, TransitionPresets} from "@react-navigation/stack";

import TaskList from "../pages/TaskList";
import Auth from "../pages/Auth";

export default function Routes(){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator
        screenOptions={{
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 150 } },
              close: { animation: 'timing', config: { duration: 350 } },
            },
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShadowVisible: false, //REMOVE A SOMBRA QUE APARECE DEBAIXO DO CABEÇALHO

        }}
        >
            <Stack.Screen 
            name="Auth" 
            component={Auth} 
            options={{
                headerShown: false
                }}
            />

            <Stack.Screen 
            name="TaskList" 
            component={TaskList} 
            options={{
                title: "Task",
                headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}