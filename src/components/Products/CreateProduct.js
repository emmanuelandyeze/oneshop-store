import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput,
	Image,
	RefreshControl,
	Alert,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SelectPicker from 'react-native-form-select-picker';
var { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Layout/Header';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const options = [
	"Men's Health",
	"Women's Health",
	"Children's Health",
	'Health and Vitality',
	'Internal Health',
	'Diet and Detox',
];

const CreateProduct = ({ navigation }) => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const { user, loading } = useSelector(
		(state) => state.user,
	);

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [Stock, setStock] = useState('');
	const [vendor, setVendor] = useState(`${user._id}`);
	const [images, setImages] = useState(
		'https://cdn.iconscout.com/icon/premium/png-256-thumb/add-product-2489220-2086170.png',
	);

	const submitData = () => {
		fetch(
			'https://apponeshop.herokuapp.com/api/v2/pending-products/new',
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					price,
					description,
					category,
					Stock,
					images,
					vendor,
				}),
			},
		)
			.then((res) => res.json())
			.then((data) => {
				navigation.navigate('Home');
			});
	};

	const uploadImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImages(result.uri);
		}
	};

	return (
		<View>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
			<>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<View style={styles.container}>
						<View style={styles.LoginBox}>
							<View style={styles.relative}>
								<View
									style={{
										marginTop: 0,
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<TouchableOpacity onPress={uploadImage}>
										<View
											style={{
												marginLeft: 0,
												height: 250,
												width: width - 50,
												backgroundColor: '#f5f5f5',
												textAlign: 'center',
												justifyContent: 'center',
												alignItems: 'center',
												borderRadius: 10,
											}}
										>
											<Image
												source={{
													uri: images,
												}}
												style={{
													width: '100%',
													height: '100%',
													borderRadius: 5,
													resizeMode: 'contain',
													borderWidth: 1,
													borderColor: '#999',
												}}
											/>
										</View>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Name of product"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={name}
									onChangeText={setName}
								/>
							</View>
							<View
								style={{
									borderWidth: 1,
									width: '97%',
									marginBottom: 5,
									borderColor: '#72B541',
									borderRadius: 5,
								}}
							>
								<SelectPicker
									onValueChange={(value) => {
										setCategory(value);
									}}
									category={category}
									placeholder="Select Category"
									placeholderStyle={{
										fontSize: 20,
										color: '#000',
										fontWeight: 'bold',
									}}
									titleText="Select Category"
								>
									{Object.values(options).map(
										(val, index) => (
											<SelectPicker.Item
												label={val}
												value={val}
												key={index}
											/>
										),
									)}
								</SelectPicker>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Description"
									placeholderTextColor="#333"
									style={styles.descriptionBox}
									value={description}
									multiline={true}
									numberOfLines={4}
									onChangeText={setDescription}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder=""
									placeholderTextColor="#333"
									style={styles.hiddenInput}
									value={vendor}
									onChangeText={setVendor}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Price"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={price}
									keyboardType="numeric"
									onChangeText={setPrice}
								/>
							</View>
							<View style={styles.relative}>
								<TextInput
									placeholder="Count in Stock"
									placeholderTextColor="#333"
									style={styles.inputBox}
									value={Stock}
									keyboardType="numeric"
									onChangeText={setStock}
								/>
							</View>
							<TouchableOpacity onPress={submitData}>
								<View style={styles.Button}>
									<Text
										style={{
											color: '#fff',
											fontSize: 18,
										}}
									>
										Upload
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</>
		</View>
	);
};

export default CreateProduct;

const styles = StyleSheet.create({
	container: {
		width: width * 1,
		padding: 20,
		backgroundColor: '#fff',
		height: width * 2,
	},
	LoginHeader: {
		width: width * 1,
		paddingTop: width / 150,
		paddingLeft: 10,
	},
	inputBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 10,
		paddingVertical: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginVertical: 10,
	},
	descriptionBox: {
		width: width * 1 - 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#72B541',
		paddingLeft: 10,
		paddingVertical: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333',
		marginVertical: 1,
	},
	relative: {
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		top: 20,
		left: 10,
		zIndex: 10,
		color: '#72B541',
	},
	LoginBox: {
		marginTop: width / 14,
		height: '100%',
	},
	Button: {
		width: width * 1 - 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: '#72B541',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
	productDetailsTop: {
		width: width * 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: width / 6,
		paddingHorizontal: 10,
		elevation: 8,
		backgroundColor: '#fff',
	},
	hiddenInput: {
		width: 0,
		height: 0,
	},
});
