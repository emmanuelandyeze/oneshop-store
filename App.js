import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import Store from './Redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import { loadUser } from './Redux/actions/userActions';

export default function App() {
	const [isAuthenticated, setIsAuthenticated] =
		useState(false);
	return (
		<Provider store={Store}>
			<AppStack />
		</Provider>
	);
}

const AppStack = () => {
	const { loading, userInfo, isAuthenticated } =
		useSelector((state) => state.userLogin);

	useEffect(() => {
		Store.dispatch(loadUser());
	}, []);

	return (
		<NavigationContainer>
			<>
				{loading ? (
					<Text>Loading</Text>
				) : (
					<>{userInfo ? <Main /> : <Auth />}</>
				)}
			</>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});
