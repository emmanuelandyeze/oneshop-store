import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import SelectPicker from 'react-native-form-select-picker';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../Redux/actions/cartActions';
var { width } = Dimensions.get('window');
import Icon from '@expo/vector-icons/Ionicons';

const countryOptions = ['Nigeria'];
const cityOptions = [
	'Lagos',
	'Ogun',
	'Ondo',
	'Abuja',
	'Oyo',
];

const ShippingScreen = ({ navigation }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(
		shippingAddress.address,
	);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode,
	);
	const [country, setCountry] = useState(
		shippingAddress.country,
	);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({
				address,
				city,
				postalCode,
				country,
			}),
		);
		navigation.navigate('Payment');
	};
	return (
		<View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.LoginBox}>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Address
					</Text>
					<View style={styles.relative}>
						<TextInput
							placeholder="Enter Address"
							placeholderTextColor="#333"
							style={styles.inputBox}
							value={address}
							onChangeText={setAddress}
						/>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						State
					</Text>
					<View
						style={{
							borderWidth: 1,
							width: width - 50,
							marginBottom: 5,
							borderColor: '#72B541',
							borderRadius: 5,
						}}
					>
						<SelectPicker
							onValueChange={(value) => {
								setCity(value);
							}}
							category={city}
							placeholder="--State--"
							placeholderStyle={{
								fontSize: 15,
								color: '#000',
								
								width: '100%',
							}}
							titleText="Choose State"
						>
							{Object.values(cityOptions).map(
								(val, index) => (
									<SelectPicker.Item
										label={val}
										value={val}
										key={index}
									/>
								),
							)}
						</SelectPicker>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Country
					</Text>
					<View
						style={{
							borderWidth: 1,
							width: width - 50,
							marginBottom: 5,
							borderColor: '#72B541',
							borderRadius: 5,
						}}
					>
						<SelectPicker
							onValueChange={(value) => {
								setCountry(value);
							}}
							category={country}
							placeholder="--Country--"
							placeholderStyle={{
								fontSize: 15,
								color: '#000',
								
								width: '100%',
							}}
							titleText="Choose Country"
						>
							{Object.values(countryOptions).map(
								(val, index) => (
									<SelectPicker.Item
										label={val}
										value={val}
										key={index}
									/>
								),
							)}
						</SelectPicker>
					</View>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Phone Number
					</Text>
					<View style={styles.relative}>
						<TextInput
							placeholder="Enter Phone Number"
							placeholderTextColor="#333"
							style={styles.inputBox}
							value={postalCode}
							onChangeText={setPostalCode}
							keyboardType="numeric"
						/>
					</View>

					<View style={styles.relative}>
						<TouchableOpacity onPress={submitHandler}>
							<View style={styles.Button}>
								<Text
									style={{ color: '#fff', fontSize: 18 }}
								>
									Continue
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ShippingScreen;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 50,
		paddingLeft: 10,
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 15,
		paddingVertical: 10,
		fontSize: 15,
		color: '#333',
		marginVertical: 10,
	},

	relative: {
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		top: 20,
		left: 10,
		zIndex: 10,
		color: '#72B541',
	},
	LoginBox: {
		marginTop: width / 5,
		paddingLeft: 0,
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: '#72B541',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
});
