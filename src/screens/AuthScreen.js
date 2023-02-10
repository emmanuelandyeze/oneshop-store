import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const AuthScreen = ({ navigation }) => {
	return (
		<View style={{ marginTop: 40 }}>
			<Text onPress={() => navigation.navigate('Home')}>
				AuthScreen
			</Text>
		</View>
	);
};

export default AuthScreen;

const styles = StyleSheet.create({});
