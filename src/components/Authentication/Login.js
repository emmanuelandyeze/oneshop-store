import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TextInput,
	Button,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/actions/userActions';

var { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const { isAuthenticated, error, user } = useSelector(
		(state) => state.userProfile,
	);

	const loginSubmit = () => {
		dispatch(login(email, password));
	};

	useEffect(() => {
		if (error) {
			alert(error);
		}
	}, [dispatch, error, alert, user]);

	return (
		<View style={styles.container}>
			<View style={styles.loginHeader}>
				<Text
					style={{
						fontSize: 40,
						fontWeight: '800',
						fontFamily: 'Roboto',
						color: '#333',
					}}
				>
					Welcome,
				</Text>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '500',
						fontFamily: 'sans-serif',
						color: '#555',
					}}
				>
					Sign in to continue!
				</Text>
			</View>
			<View style={styles.loginBox}>
				<View>
					<Icon
						name="mail-open-outline"
						size={25}
						style={styles.icon}
					/>
					<TextInput
						placeholder="Enter your email..."
						placeholderTextColor="#333"
						style={styles.inputBox}
						textContentType="emailAddress"
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>
				</View>
				<View>
					<Icon
						name="lock-closed-outline"
						size={25}
						style={styles.icon}
					/>
					<TextInput
						placeholder="Password"
						placeholderTextColor="#333"
						style={styles.inputBox}
						textContentType="password"
						secureTextEntry={true}
						value={password}
						onChangeText={setPassword}
					/>
					<TouchableOpacity>
						<Text
							style={{
								width: width * 1 - 50,
								textAlign: 'right',
								color: '#333',
								fontSize: 15,
							}}
							onPress={() => navigation.navigate('Forgot')}
						>
							Forgot Password?
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={loginSubmit}>
						<View style={styles.button}>
							<Text
								style={{
									color: '#fff',
									fontWeight: '800',
									fontSize: 18,
								}}
							>
								Login
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('Signup')}
					>
						<View style={styles.registerButton}>
							<Text
								style={{
									color: '#72B541',
									fontWeight: '800',
									fontSize: 18,
								}}
							>
								Register
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		width: width * 1,
		padding: 20,
		marginTop: 30,
		height: width * 2 - 100,
	},
	loginHeader: {
		width: width * 1,
		paddingVertical: 20,
		paddingTop: width / 5,
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#72B541',
		paddingLeft: 50,
		height: 50,
		fontSize: 15,
		marginVertical: 10,
	},
	icon: {
		position: 'absolute',
		top: 20,
		left: 7,
		zIndex: 10,
		color: '#72B541',
	},
	loginBox: {
		marginTop: width / 4,
	},
	button: {
		width: width * 1 - 50,
		height: 50,
		backgroundColor: '#72B541',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
	registerButton: {
		width: width * 1 - 50,
		height: 50,
		backgroundColor: 'transparent',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#72B541',
	},
});
