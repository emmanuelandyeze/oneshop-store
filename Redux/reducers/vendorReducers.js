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

export const vendorLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_LOGIN_REQUEST:
			return { loading: true };
		case VENDOR_LOGIN_SUCCESS:
			return {
				loading: false,
				isAuthenticated: true,
				vendorInfo: action.payload,
			};
		case VENDOR_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const vendorRegisterReducer = (
	state = {},
	action,
) => {
	switch (action.type) {
		case VENDOR_REGISTER_REQUEST:
			return { loading: true };
		case VENDOR_REGISTER_SUCCESS:
			return { loading: false, vendorInfo: action.payload };
		case VENDOR_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const vendorDetailsReducer = (
	state = { vendor: {} },
	action,
) => {
	switch (action.type) {
		case VENDOR_DETAILS_REQUEST:
			return { ...state, loading: true };
		case VENDOR_DETAILS_SUCCESS:
			return { loading: false, vendor: action.payload };
		case VENDOR_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_DETAILS_RESET:
			return { vendor: {} };
		default:
			return state;
	}
};

export const vendorProfileReducer = (
	state = { vendor: {} },
	action,
) => {
	switch (action.type) {
		case VENDOR_GET_PROFILE_REQUEST:
			return { ...state, loading: true };
		case VENDOR_GET_PROFILE_SUCCESS:
			return {
				loading: false,
				vendor: action.payload,
				isAuthenticated: true,
			};
		case VENDOR_GET_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export const vendorUpdateProfileReducer = (
	state = {},
	action,
) => {
	switch (action.type) {
		case VENDOR_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case VENDOR_UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				success: true,
				vendorInfo: action.payload,
			};
		case VENDOR_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_UPDATE_PROFILE_RESET:
			return {};
		default:
			return state;
	}
};

export const vendorListReducer = (
	state = { vendors: [] },
	action,
) => {
	switch (action.type) {
		case VENDOR_LIST_REQUEST:
			return { loading: true };
		case VENDOR_LIST_SUCCESS:
			return { loading: false, users: action.payload };
		case VENDOR_LIST_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_LIST_RESET:
			return { vendors: [] };
		default:
			return state;
	}
};

export const vendorDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case VENDOR_DELETE_REQUEST:
			return { loading: true };
		case VENDOR_DELETE_SUCCESS:
			return { loading: false, success: true };
		case VENDOR_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vendorUpdateReducer = (
	state = { vendor: {} },
	action,
) => {
	switch (action.type) {
		case VENDOR_UPDATE_REQUEST:
			return { loading: true };
		case VENDOR_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case VENDOR_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case VENDOR_UPDATE_RESET:
			return {
				vendor: {},
			};
		default:
			return state;
	}
};
