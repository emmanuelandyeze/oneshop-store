import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
// import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';

const Auth = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
			/>
			{/* <Stack.Screen
				name="Forgot"
				component={ForgotPasswordScreen}
			/> */}
		</Stack.Navigator>
	);
};

export default Auth;

const styles = StyleSheet.create({});
