import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToCart = (item) => ({
	type: CART_ADD_ITEM,
	payload: item,
});

export const removeFromCart =
	(id) => (dispatch, getState) => {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		});

		AsyncStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems),
		);
	};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	AsyncStorage.setItem(
		'shippingAddress',
		JSON.stringify(data),
	);
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	AsyncStorage.setItem(
		'paymentMethod',
		JSON.stringify(data),
	);
};
