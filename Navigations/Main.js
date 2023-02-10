import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthScreen from '../src/screens/AuthScreen';
import HomeScreen from '../src/screens/HomeScreen';
import CreateScreen from '../src/screens/CreateScreen';
import CartScreen from '../src/screens/CartScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import ProductsScreen from '../src/screens/ProductsScreen';
import ProductDetails from '../src/components/Products/ProductDetails';
import ShippingScreen from '../src/screens/ShippingScreen';
import PaymentScreen from '../src/screens/Payment';
import PlaceOrderScreen from '../src/screens/PlaceOrderScreen';
import OrderScreen from '../src/screens/OrderScreen';
import OrderListScreen from '../src/screens/OrderListScreen';
import Header from '../src/components/Layout/Header';

const Main = () => {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Home" component={Tabs} />
			<Stack.Screen name="Auth" component={AuthScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Order" component={OrderScreen} />
			{/* <Stack.Screen name="Header" component={Header} /> */}
			<Stack.Screen
				name="OrderList"
				component={OrderListScreen}
			/>
			<Stack.Screen
				name="Signup"
				component={SignupScreen}
			/>
			<Stack.Screen
				name="ProductDetails"
				component={ProductDetails}
			/>
			<Stack.Screen
				name="CreateProduct"
				component={CreateScreen}
			/>
			<Stack.Screen
				name="Store"
				component={ProductsScreen}
			/>
			<Stack.Screen
				name="Shipping"
				component={ShippingScreen}
			/>
			<Stack.Screen
				name="Payment"
				component={PaymentScreen}
			/>
			<Stack.Screen
				name="PlaceOrder"
				component={PlaceOrderScreen}
			/>

		</Stack.Navigator>
	);
};


export default Main;

const styles = StyleSheet.create({});
