import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../Redux/actions/cartActions';
var { width } = Dimensions.get('window');

const Payment = ({ navigation }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		navigation.navigate('Shipping');
	}

	const [paymentMethod, setPaymentMethod] =
		useState('PayStack');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigation.navigate('PlaceOrder');
	};
	return (
		<View>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<Text
					style={{
						paddingTop: 45,
						fontSize: 20,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					Payment Method
				</Text>
				<View>
					<Text
						style={{
							textAlign: 'left',
							fontSize: 20,
							fontWeight: 'bold',
							paddingTop: 50,
						}}
					>
						Select Method
					</Text>
					<View style={styles.relative}>
						<TextInput
							placeholderTextColor="#fff"
							style={styles.inputBox}
							value={paymentMethod}
							editable={false}
							onChangeText={setPaymentMethod}
						/>
					</View>
					<View style={styles.relative}>
						<TouchableOpacity onPress={submitHandler}>
							<View style={styles.Button}>
								<Text
									style={{ color: '#72B541', fontSize: 18 }}
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

export default Payment;

const styles = StyleSheet.create({
	scrollView: {
		paddingHorizontal: 20,
	},
	contentContainer: {
		justifyContent: 'center',
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 15,
		paddingVertical: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
		marginVertical: 10,
		backgroundColor: '#72B541',
		textAlign: 'center'
	},

	relative: {
		position: 'relative',
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#72B541',
	},
});
