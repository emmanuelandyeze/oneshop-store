import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import { removeFromCart } from '../../Redux/actions/cartActions'
import { useDispatch } from 'react-redux';

const CartScreen = ({ cartItems, navigation }) => {
	const dispatch = useDispatch()
	const [click, setClick] = React.useState(false);
	// Increase quantity
	const [quantity, setQuantity] = useState(1);

	const [delivery, setDelivery] = useState(1500);

	const checkoutHandler = () => {
		navigation.navigate('Shipping');
	};

	return (
		<>
			<View style={{ paddingTop: 30 }}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<View style={{paddingTop: 30}}>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
						>
							<Icon
								name="arrow-back"
								color="#333"
								size={30}
							/>
						</TouchableOpacity>
						{click ? (
							<Icon
								name="heart"
								size={30}
								style={{
									marginRight: 10,
									color: 'crimson',
									position: 'absolute',
									bottom: 0,
									right: 0,
								}}
								onPress={() => setClick(!click)}
							/>
						) : (
							<Icon
								name="heart-outline"
								size={0}
								style={{
									marginRight: 10,
									color: '#333',
									position: 'absolute',
									bottom: 0,
									right: 0,
								}}
								onPress={() => setClick(!click)}
							/>
						)}
					</View>
					{cartItems.length ? (
						<>
							<View>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 30,
										fontWeight: 'bold',
									}}
								>
									Cart
								</Text>
								{cartItems.map((item) => {
									return (
										<View
											key={item._id}
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
												padding: 10,
												borderWidth: 1,
												borderColor: '#e8e8e8',
											}}
										>
											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
												}}
											>
												<Image
													source={{ uri: item.image }}
													style={{
														height: 100,
														width: 100,
														marginRight: 10,
													}}
												/>
												<View>
													<Text
														style={{
															fontSize: 25,
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
															backgroundColor: '#e8e8e8',
															paddingHorizontal: 5,
														}}
													>
														<Text
															style={{
																fontSize: 15,
																fontWeight: 'bold',
																textAlign: 'center',
															}}
														>
															X {item.quantity}
														</Text>
														<Text
															style={{
																color: '#000',
																padding: 10,
																fontSize: 15,
																borderRadius: 5,
																fontWeight: 'bold',
															}}
														>
															₦
															{(
																item.quantity * item.price
															).toFixed(2)}
														</Text>
													</View>
												</View>
											</View>
										</View>
									);
								})}
							</View>
							<View>
								<TouchableOpacity
									onPress={() => {
										dispatch(removeFromCart());
										navigation.navigate('Cart');
									}}
									style={{ alignSelf: 'center' }}
								>
									<Text
										style={{
											backgroundColor: 'red',
											color: '#fff',
											fontSize: 16,
											padding: 10,
											borderRadius: 5,
											textAlign: 'center',
											width: '70%',
											marginTop: 10,
											paddingHorizontal: 10,
										}}
									>
										Clear Cart
									</Text>
								</TouchableOpacity>
							</View>
							<View
								style={{
									padding: 10,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Text
									style={{
										fontSize: 25,
										fontWeight: 'bold',
										textAlign: 'left',
									}}
								>
									Subtotal (
									{cartItems.reduce(
										(acc, item) => acc + item.quantity,
										0,
									)}
									) items
								</Text>
								<Text
									style={{
										fontSize: 25,
										fontWeight: 'bold',
									}}
								>
									₦
									{cartItems
										.reduce(
											(acc, item) =>
												acc + item.quantity * item.price,
											0,
										)
										.toFixed(2)}
								</Text>
							</View>
							<View>
								<TouchableOpacity
									style={{ alignSelf: 'center' }}
									onPress={checkoutHandler}
								>
									<Text
										style={{
											backgroundColor: '#72B541',
											width: '70%',
											textAlign: 'center',
											color: '#fff',
											padding: 10,
											borderRadius: 5,
											fontSize: 18,
										}}
									>
										Proceed to Checkout
									</Text>
								</TouchableOpacity>
							</View>
						</>
					) : (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>
								Looks like your Cart is empty
							</Text>
							<Text style={styles.emptyText}>
								Add products to your cart to get started
							</Text>
							<TouchableOpacity
								onPress={navigation.navigate('Home')}
							>
								<Text style={styles.button}>
									Go to Home Page
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</ScrollView>
			</View>
		</>
	);
};

const mapStateToProps = (state) => ({
	cartItems: state.cart.cartItems,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(CartScreen);

const styles = StyleSheet.create({
	emptyContainer: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	button: {
		backgroundColor: '#72B541',
		color: '#fff',
		padding: 10,
		borderRadius: 5,
		fontWeight: 'bold',
		marginTop: 10,
	},
	quantity: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center',
	},
	quantityBox: {
		width: 40,
		height: 40,
		backgroundColor: '#72B541',
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
	},
	scrollView: {
		paddingHorizontal: 20,
		paddingVertical: 0,
	},
	contentContainer: {
		justifyContent: 'center',
	},
});
