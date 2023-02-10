import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../Redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../../Redux/constants/orderConstants';
import { USER_DETAILS_RESET } from '../../Redux/constants/userConstants';

const PlaceOrderScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);

	if (!cart.shippingAddress.address) {
		navigation.navigate('Shipping');
	} else if (!cart.paymentMethod) {
		navigation.navigate('Payment');
	}
	//   Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};


	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		),
	);
	cart.shippingPrice = addDecimals(
		cart.shippingAddress.city === 'Lagos' ? 1500 : 2500,
	);
	cart.taxPrice = addDecimals(
		Number((0 * cart.itemsPrice).toFixed(2)),
	);
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
				user: userInfo._id,
				token: userInfo.token,
			}),
		);
		alert(
			'👍 Order succesfully placed... Go to Order Screen to make payment.',
		);
	};

	const orderCreate = useSelector(
		(state) => state.orderCreate,
	);
	const { order, success, error } = orderCreate;

	console.log(order);
	return (
		<>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View
					style={{
						paddingVertical: 30,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{ fontSize: 30, fontWeight: 'bold' }}
					>
						Shipping
					</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						Address: {cart.shippingAddress.address},{' '}
						{cart.shippingAddress.city}{' '}
						{cart.shippingAddress.country}
					</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						Phone Number: {cart.shippingAddress.postalCode}
					</Text>
				</View>
				<View
					style={{
						paddingVertical: 30,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{ fontSize: 30, fontWeight: 'bold' }}
					>
						Payment Method
					</Text>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						Method: {cart.paymentMethod}
					</Text>
				</View>
				<View
					style={{
						paddingVertical: 30,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{ fontSize: 30, fontWeight: 'bold' }}
					>
						Order Items
					</Text>
					<View
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						{cart.cartItems.length === 0 ? (
							<Text>Your cart is empty</Text>
						) : (
							<ScrollView>
								{cart.cartItems.map((item, index) => (
									<View
										key={index}
										style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
										}}
									>
										<Image
											source={{ uri: item.image }}
											style={{
												height: 50,
												width: 50,
												marginRight: 10,
												borderRadius: 50,
											}}
										/>
										<View>
											<Text
												style={{
													fontSize: 20,
													fontWeight: 'bold',
												}}
											>
												{item.name}
											</Text>
											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
												}}
											>
												<Text
													style={{
														fontSize: 15,
														fontWeight: 'bold',
														textAlign: 'center',
													}}
												>
													{item.quantity} x ₦{item.price} =
													₦{item.quantity * item.price}
												</Text>
											</View>
										</View>
									</View>
								))}
							</ScrollView>
						)}
					</View>
				</View>
				<View
					style={{
						paddingVertical: 30,
					}}
				>
					<Text
						style={{ fontSize: 30, fontWeight: 'bold' }}
					>
						Order Summary
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Items
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							₦{cart.itemsPrice}
						</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Delivery Fee
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							₦{cart.shippingPrice}
						</Text>
					</View>

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
							borderTopWidth: 1,
							borderBottomWidth: 1,
							paddingVertical: 10,
						}}
					>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							Total
						</Text>
						<Text
							style={{ fontSize: 20, fontWeight: 'bold' }}
						>
							₦{cart.totalPrice}
						</Text>
					</View>
					<TouchableOpacity
						style={{
							width: '50%',
							alignSelf: 'flex-end',
							marginTop: 20,
						}}
						onPress={placeOrderHandler}
					>
						<Text
							style={{
								backgroundColor: '#72B541',
								textAlign: 'center',
								fontSize: 25,
								padding: 5,
								borderRadius: 5,
								color: '#fff',
							}}
						>
							Place Order
						</Text>
					</TouchableOpacity>
					{cart.cartItems.length === 0 ? (
						<TouchableOpacity
						style={{
							width: '50%',
							alignSelf: 'flex-end',
							marginTop: 20,
						}}
						onPress={() =>
							navigation.navigate('OrderList', {
								order: order,
							})
						}
					>
						<Text
							style={{
								backgroundColor: '#333',
								textAlign: 'center',
								fontSize: 25,
								padding: 5,
								borderRadius: 5,
								color: '#fff',
							}}
						>
							Continue
						</Text>
					</TouchableOpacity>
					): null}
					
				</View>
			</ScrollView>
		</>
	);
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
	scrollView: {
		paddingHorizontal: 20,
		paddingVertical: 0,
	},
	contentContainer: {
		justifyContent: 'center',
	},
});
