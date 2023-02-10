import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
var { width } = Dimensions.get('window');
import Icon from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { register } from '../../../Redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUp({ navigation }) {
	const { isAuthenticated, error, user } = useSelector(
		(state) => state.userProfile,
	);

	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [avatar, setAvatar] = useState(
		'https://mern-nest-ecommerce.herokuapp.com/profile.png',
	);

	const submitData = () => {
		fetch('https://oneshopadmin.herokuapp.com/api/users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				avatar,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				navigation.navigate('Login');
			});
	};

	const uploadImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setAvatar(result.uri);
		}
	};

	useEffect(() => {
		if (error) {
			alert(error);
			dispatch({ type: 'clearErrors' });
		}

		if (isAuthenticated) {
			alert('User create Done!');
		}
	}, [dispatch, error, alert, isAuthenticated]);

	return (
		<View style={styles.container}>
			<View style={styles.LoginHeader}>
				<Text
					style={{
						fontSize: 30,
						fontWeight: '700',
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
					Create an account to continue!
				</Text>
			</View>
			<View style={styles.LoginBox}>
				<View style={styles.relative}>
					<Icon
						name="person-circle-outline"
						size={25}
						style={styles.icon}
					/>
					<TextInput
						placeholder="Your Full Name"
						placeholderTextColor="#333"
						style={styles.inputBox}
						value={name}
						onChangeText={(text) => setName(text)}
						textContentType="name"
					/>
				</View>
				<View style={styles.relative}>
					<Icon
						name="mail-open-outline"
						size={25}
						style={styles.icon}
					/>
					<TextInput
						placeholder="Your Email Address"
						placeholderTextColor="#333"
						style={styles.inputBox}
						value={email}
						onChangeText={(text) => setEmail(text)}
						textContentType="emailAddress"
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.relative}>
					<Icon
						name="lock-closed-outline"
						size={25}
						style={styles.icon}
					/>
					<TextInput
						placeholder="Choose a password"
						placeholderTextColor="#333"
						value={password}
						onChangeText={(text) => setPassword(text)}
						style={styles.inputBox}
						textContentType="password"
						secureTextEntry={true}
					/>
				</View>
				<View style={styles.relative}>
					<View
						style={{
							marginTop: 10,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Image
							source={{ uri: avatar }}
							style={{
								width: 0,
								height: 0,
								borderRadius: 80,
								resizeMode: 'contain',
								borderWidth: 1,
								borderColor: '#999',
							}}
						/>
						<TouchableOpacity onPress={uploadImage}>
							<View
								style={{
									marginLeft: 10,
									height: 0,
									width: width * 1 - 100,
									backgroundColor: '#f5f5f5',
									textAlign: 'center',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 10,
								}}
							>
								<Text
									style={{
										color: '#333',
										fontSize: 18,
									}}
								>
									Choose Photo
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={submitData}>
						<View style={styles.Button}>
							<Text style={{ color: '#fff', fontSize: 18 }}>
								Register
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					paddingTop: width / 6 - 20,
					justifyContent: 'flex-end',
				}}
			>
				<Text
					style={{
						color: '#333',
						fontSize: 15,
					}}
				>
					Already have a account ?
				</Text>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Text
						style={{
							fontSize: 15,
							color: '#72B541',
							paddingRight: 15,
						}}
					>
						{' '}
						Sign In
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: width * 1,
		padding: 20,
		backgroundColor: '#e5e5e5',
		height: width * 2,
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 5,
		paddingLeft: 10,
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
	relative: {
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		top: 20,
		left: 7,
		zIndex: 10,
		color: '#72B541',
	},
	LoginBox: {
		marginTop: width / 4,
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		backgroundColor: '#72B541',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
});
