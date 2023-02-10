import axios from 'axios';
import {
	VENDOR_DETAILS_FAIL,
	VENDOR_DETAILS_REQUEST,
	VENDOR_DETAILS_RESET,
	VENDOR_DETAILS_SUCCESS,
	VENDOR_LIST_REQUEST,
	VENDOR_LIST_SUCCESS,
	VENDOR_LIST_FAIL,
	VENDOR_LIST_RESET,
	VENDOR_LOGIN_FAIL,
	VENDOR_LOGIN_REQUEST,
	VENDOR_LOGIN_SUCCESS,
	VENDOR_LOGOUT,
	VENDOR_REGISTER_FAIL,
	VENDOR_REGISTER_REQUEST,
	VENDOR_REGISTER_SUCCESS,
	VENDOR_UPDATE_PROFILE_FAIL,
	VENDOR_UPDATE_PROFILE_REQUEST,
	VENDOR_UPDATE_PROFILE_SUCCESS,
	VENDOR_DELETE_REQUEST,
	VENDOR_DELETE_SUCCESS,
	VENDOR_DELETE_FAIL,
	VENDOR_UPDATE_RESET,
	VENDOR_UPDATE_REQUEST,
	VENDOR_UPDATE_SUCCESS,
	VENDOR_UPDATE_FAIL,
	VENDOR_UPDATE_PROFILE_RESET,
	VENDOR_GET_PROFILE_REQUEST,
	VENDOR_GET_PROFILE_SUCCESS,
	VENDOR_GET_PROFILE_FAIL,
} from '../constants/vendorConstants';

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login =
	(email, password) => async (dispatch) => {
		try {
			dispatch({
				type: VENDOR_LOGIN_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'http://192.168.0.198:5000/api/vendors/login',
				{ email, password },
				config,
			);

			dispatch({
				type: VENDOR_LOGIN_SUCCESS,
				payload: data,
			});

			await AsyncStorage.setItem(
				'vendorInfo',
				JSON.stringify(data),
			);
		} catch (error) {
			dispatch({
				type: VENDOR_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const logout = () => (dispatch) => {
	AsyncStorage.removeItem('vendorInfo');
	AsyncStorage.removeItem('cartItems');
	AsyncStorage.removeItem('shippingAddress');
	AsyncStorage.removeItem('paymentMethod');
	dispatch({ type: VENDOR_LOGOUT });
	dispatch({ type: VENDOR_DETAILS_RESET });
	dispatch({ type: ORDER_LIST_MY_RESET });
	dispatch({ type: VENDOR_LIST_RESET });
};

export const register =
	(
		name,
		email,
		password,
		category,
		phoneNumber,
		bankName,
		accountName,
		accountNumber,
	) =>
	async (dispatch) => {
		try {
			dispatch({
				type: VENDOR_REGISTER_REQUEST,
			});

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'http://192.168.0.198:5000/api/vendors',
				{
					name,
					email,
					password,
					category,
					phoneNumber,
					bankName,
					accountName,
					accountNumber,
				},
				config,
			);

			dispatch({
				type: VENDOR_REGISTER_SUCCESS,
				payload: data,
			});

			dispatch({
				type: VENDOR_LOGIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem(
				'vendorInfo',
				JSON.stringify(data),
			);
		} catch (error) {
			dispatch({
				type: VENDOR_REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getVendorDetails =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_DETAILS_REQUEST,
			});

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${vendorInfo.vendor.token}`,
				},
			};

			const { data } = await axios.get(
				`http://192.168.0.198:5000/api/vendors/${id}`,
				config,
			);

			dispatch({
				type: VENDOR_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_DETAILS_FAIL,
				payload: message,
			});
		}
	};

// Load Vendor
export const loadVendor =
	(token) => async (dispatch, getState) => {
		try {
			dispatch({ type: VENDOR_GET_PROFILE_REQUEST });

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await axios.get(
				`http://192.168.0.198:5000/api/vendors/profile`,
			);

			dispatch({
				type: VENDOR_GET_PROFILE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_GET_PROFILE_FAIL,
				payload: message,
			});
		}
	};

export const updateVendorProfile =
	(vendor) => async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_UPDATE_PROFILE_REQUEST,
			});

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`http://192.168.0.198:5000/api/vendors/profile`,
				vendor,
				config,
			);

			dispatch({
				type: VENDOR_UPDATE_PROFILE_SUCCESS,
				payload: data,
			});
			dispatch({
				type: VENDOR_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem(
				'vendorInfo',
				JSON.stringify(data),
			);
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_UPDATE_PROFILE_FAIL,
				payload: message,
			});
		}
	};

export const listVendors =
	() => async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_LIST_REQUEST,
			});

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`http://192.168.0.198:5000/api/vendors`,
				config,
			);

			dispatch({
				type: VENDOR_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_LIST_FAIL,
				payload: message,
			});
		}
	};

export const deleteVendor =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_DELETE_REQUEST,
			});

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			};

			await axios.delete(
				`http://192.168.0.198:5000/api/vendors/${id}`,
				config,
			);

			dispatch({ type: VENDOR_DELETE_SUCCESS });
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_DELETE_FAIL,
				payload: message,
			});
		}
	};

export const updateVendor =
	(vendor) => async (dispatch, getState) => {
		try {
			dispatch({
				type: VENDOR_UPDATE_REQUEST,
			});

			const {
				vendorLogin: { vendorInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${vendorInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`http://192.168.0.198:5000/api/vendors/${vendor._id}`,
				vendor,
				config,
			);

			dispatch({ type: VENDOR_UPDATE_SUCCESS });

			dispatch({
				type: VENDOR_DETAILS_SUCCESS,
				payload: data,
			});

			dispatch({ type: VENDOR_DETAILS_RESET });
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;
			if (message === 'Not authorized, token failed') {
				dispatch(logout());
			}
			dispatch({
				type: VENDOR_UPDATE_FAIL,
				payload: message,
			});
		}
	};
