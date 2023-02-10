import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	Image,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {
	Paystack,
	paystackProps,
} from 'react-native-paystack-webview';
import axios from 'axios';
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../../Redux/actions/orderActions';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../../Redux/constants/orderConstants';

const OrderScreen = ({ navigation, route }) => {
	const orderId = route.params?.order._id;

	const dispatch = useDispatch();

	const orderDetails = useSelector(
		(state) => state.orderDetails,
	);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } =
		orderPay;

	const orderDeliver = useSelector(
		(state) => state.orderDeliver,
	);
	const {
		loading: loadingDeliver,
		success: successDeliver,
	} = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!loading) {
		//   Calculate prices
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0,
			),
		);
	}
	const paystackWebViewRef = useRef(
		paystackProps.PayStackRef,
	);

	return (
		<>
			<View style={{ padding: 20 }}>
				<View style={{ paddingTop: 10 }}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
					>
						<Icon
							name="arrow-back"
							color="#333"
							size={30}
						/>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 20 }}>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 25,
							textAlign: 'center',
						}}
					>
						Order Id: {route.params?.order._id}
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							borderTopWidth: 1,
							marginTop: 10,
							borderBottomWidth: 1,
							paddingVertical: 10,
						}}
					>
						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: 'bold' }}>
								Name:
							</Text>{' '}
							{userInfo.name}
						</Text>
						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: 'bold' }}>
								Email:
							</Text>{' '}
							{userInfo.email}
						</Text>
						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: 'bold' }}>
								Billing Address:
							</Text>{' '}
							{route.params?.order.shippingAddress.address},{' '}
							{route.params?.order.shippingAddress.city}, ,{' '}
							{route.params?.order.shippingAddress.country}
						</Text>
						<Text style={{ fontSize: 18 }}>
							<Text style={{ fontWeight: 'bold' }}>
								Phone Number:
							</Text>{' '}
							{
								route.params?.order.shippingAddress
									.postalCode
							}
						</Text>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginTop: 10,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Payment Method
					</Text>
					<Text>
						Method: <Text>PayStack</Text>
					</Text>
					{route.params?.order.isPaid ? (
						<Text
							style={{
								backgroundColor: '#72B541',
								color: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
								borderRadius: 5,
								marginVertical: 5,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Paid on {route.params?.order.paidAt}
						</Text>
					) : (
						<Text
							style={{
								backgroundColor: 'red',
								color: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
								borderRadius: 5,
								marginVertical: 5,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Not Paid
						</Text>
					)}
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginTop: 10,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
					>
						Delivery
					</Text>
					{route.params?.order.isDelivered ? (
						<Text
							style={{
								backgroundColor: '#72B541',
								color: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
								borderRadius: 5,
								marginVertical: 5,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Delivered at {route.params?.order.deliveredAt}
						</Text>
					) : (
						<Text
							style={{
								backgroundColor: 'red',
								color: '#fff',
								width: '100%',
								textAlign: 'center',
								paddingVertical: 10,
								borderRadius: 5,
								marginVertical: 5,
								fontSize: 20,
								fontWeight: 'bold',
							}}
						>
							Not Delivered
						</Text>
					)}
				</View>
				<View style={{ paddingVertical: 10 }}>
					<Text
						style={{ fontSize: 18, fontWeight: 'bold' }}
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
						{route.params?.order.orderItems.length === 0 ? (
							<Text>Order is empty</Text>
						) : (
							<ScrollView>
								{route.params?.order.orderItems.map(
									(item, index) => (
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
														{item.quantity} x ₦{item.price}{' '}
														= ₦{item.quantity * item.price}
													</Text>
												</View>
											</View>
										</View>
									),
								)}
							</ScrollView>
						)}
					</View>
				</View>
				<View>
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
							₦{route.params?.order.totalPrice}
						</Text>
					</View>
				</View>
				<View>
					{!route.params?.order.isPaid ? (
						<TouchableOpacity
							onPress={() =>
								paystackWebViewRef.current.startTransaction()
							}
							style={{ alignSelf: 'center', marginTop: 10 }}
						>
							<Text
								style={{
									textAlign: 'center',
									backgroundColor: '#72B541',
									color: '#fff',
									width: 300,
									paddingVertical: 10,
									fontSize: 20,
									borderRadius: 5,
									fontWeight: 'bold',
								}}
							>
								Pay Now
							</Text>
						</TouchableOpacity>
					) : null}
				</View>
				{/* <View>
					{userInfo &&
					userInfo.isAdmin &&
					route.params?.order.isPaid &&
					!route.params?.order.isDelivered ? (
						<TouchableOpacity
							style={{ alignSelf: 'center', marginTop: 10 }}
						>
							<Text
								style={{
									textAlign: 'center',
									backgroundColor: '#e8e8e8',
									color: '#fff',
									width: 200,
									paddingVertical: 5,
									fontSize: 18,
									borderRadius: 5,
								}}
							>
								Mark as Delivered
							</Text>
						</TouchableOpacity>
					) : null}
				</View> */}
				<Paystack
					paystackKey="pk_live_1b663839c9f0bba1622d04dbca7977da96a8f382"
					billingEmail={userInfo.email}
					billingName={userInfo.name}
					channels={[
						'card',
						'bank',
						'ussd',
						'qr',
						'mobile_money',
						'bank_transfer',
					]}
					amount={route.params?.order.totalPrice}
					onCancel={(e) => {
						// handle response here
					}}
					onSuccess={(paymentResult) => {
						console.log(paymentResult);
						dispatch(payOrder(orderId, paymentResult));
						navigation.navigate('Home');
					}}
					ref={paystackWebViewRef}
				/>
			</View>
		</>
	);
};

export default OrderScreen;

const styles = StyleSheet.create({});
