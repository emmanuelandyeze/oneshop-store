import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React from 'react';
import PendingProducts from '../components/Products/PendingProducts';
import Icon from '@expo/vector-icons/Ionicons';
var { width } = Dimensions.get('window');

const PendingScreen = ({ navigation }) => {
	return (
		<View style={{ marginTop: 30 }}>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<PendingProducts navigation={navigation} />
			</ScrollView>
		</View>
	);
};

export default PendingScreen;

const styles = StyleSheet.create({
	productDetailsTop: {
		width: width * 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: width / 10,
		paddingHorizontal: 10,
		elevation: 8,
		backgroundColor: '#fff',
		paddingTop: 5,
		marginBottom: 10,
	},
});
