import {
	StyleSheet,
	Text,
	View,
	ScrollView,
} from 'react-native';
import React from 'react';
import CreateProduct from '../components/Products/CreateProduct';

const CreateScreen = ({ navigation }) => {
	return (
		<View style={{ marginTop: 30 }}>
			<ScrollView
				style={{
					backgroundColor: '#e5e5e5',
				}}
			>
				<CreateProduct navigation={navigation} />
			</ScrollView>
		</View>
	);
};

export default CreateScreen;

const styles = StyleSheet.create({});
