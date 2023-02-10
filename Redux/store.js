import { combineReducers, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewCreateReducer,
	productTopRatedReducer,
} from './reducers/productReducers';
import cartReducers from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	userProfileReducer,
} from './reducers/userReducers';
import {
	vendorLoginReducer,
	vendorRegisterReducer,
	vendorDetailsReducer,
	vendorUpdateProfileReducer,
	vendorListReducer,
	vendorDeleteReducer,
	vendorUpdateReducer,
	vendorProfileReducer,
} from './reducers/vendorReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderListMyReducer,
	orderListReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productReviewCreate: productReviewCreateReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducers,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	userProfile: userProfileReducer,
	vendorLogin: vendorLoginReducer,
	vendorRegister: vendorRegisterReducer,
	vendorDetails: vendorDetailsReducer,
	vendorUpdateProfile: vendorUpdateProfileReducer,
	vendorProfile: vendorProfileReducer,
	vendorList: vendorListReducer,
	vendorDelete: vendorDeleteReducer,
	vendorUpdate: vendorUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
});

const userInfoFromStorage = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(
			'userInfo',
		);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		// error reading value
	}
};

// const vendorInfoFromStorage = async () => {
// 	try {
// 		const jsonValue = await AsyncStorage.getItem(
// 			'vendorInfo',
// 		);
// 		return jsonValue != null ? JSON.parse(jsonValue) : null;
// 	} catch (e) {
// 		alert('Failed to fetch the input from storage');
// 	}
// };

const shippingAddressFromStorage = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem(
			'shippingAddress',
		);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		alert('Failed to fetch the input from storage');
	}
};

const initialState = {
	userLogin: {},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
