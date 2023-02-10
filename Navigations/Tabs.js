import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import ProductsScreen from '../src/screens/ProductsScreen';
import WishListScreen from '../src/screens/WishListScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import Icon from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import CartScreen from '../src/screens/CartScreen';
import OrderListScreen from '../src/screens/OrderListScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="home-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Products"
				component={ProductsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="server-outline" size={25} />
						</View>
					),
				}}
			/>

			<Tab.Screen
				name="Cart"
				component={CartScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="cart-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Orders"
				component={OrderListScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="list-outline" size={25} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								tintColor: focused ? 'crimson' : 'black',
							}}
						>
							<Icon name="person-outline" size={25} />
						</View>
					),
				}}
			/>
			{/* {user.role === 'admin' ? (
				<Tab.Screen
					name="Admin"
					component={AdminScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<View
								style={{
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									tintColor: focused ? 'crimson' : 'black',
								}}
							>
								<Icon name="apps-outline" size={25} />
							</View>
						),
					}}
				/>
			) : null} */}
		</Tab.Navigator>
	);
};

export default Tabs;

const styles = StyleSheet.create({});
