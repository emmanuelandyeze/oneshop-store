import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	RefreshControl,
	ActivityIndicator,
	TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../src/components/Home/ProductCard';
import Header from '../../src/components/Layout/Header';
import Icon from '@expo/vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import Contact from '../components/Home/Contact';

var { width } = Dimensions.get('window');

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const ProductsScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(
		(state) => state.userLogin,
	);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const [data, setdata] = useState(products);
	const [search, setSearch] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [products, setProducts] = useState();

	const fetchData = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/products`,
		);
		const products = await resp.json();
		setProducts(products);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const searchHandler = (text) => {
		if (text) {
			const newData =
				products &&
				products.products.filter((item) => {
					const iteamData = item.name
						? item.name.toUpperCase()
						: ''.toUpperCase();
					const textData = text.toUpperCase();
					return iteamData.indexOf(textData) > -1;
				});
			setdata(newData);
			setSearch(text);
		} else {
			setdata(products);
			setSearch(text);
		}
	};

	return (
		<>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={fetchData}
					/>
				}
			>
				<>
					<View style={styles.headerMain}>
						<View style={styles.headerFlex}>
							<TextInput
								placeholder="Search Products..."
								placeholderTextColor="#333"
								style={styles.searchBox}
								value={search}
								onChangeText={(text) => searchHandler(text)}
							/>
							<TouchableOpacity>
								<Icon
									name="search-outline"
									size={30}
									color="#333"
									style={styles.searchIcon}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						{/* <Text
						style={{
							textAlign: 'center',
							fontSize: 20,
							fontWeight: 'bold',
							marginTop: 10,
						}}
					>
						Uploaded Products
					</Text> */}
						{/* {isLoading ? (
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<ActivityIndicator />
							</View>
						) : (
							
						)} */}
						{search.length !== 0 ? (
							<View style={styles.productCard}>
								{data &&
									data.map((product) => (
										<ProductCard
											key={product._id}
											product={product}
											navigation={navigation}
										/>
									))}
							</View>
						) : <View style={styles.productCard}>
								{products &&
									products.products.map((product) => (
										<ProductCard
											key={product._id}
											product={product}
											navigation={navigation}
										/>
									))}
						</View>
						}
					</View>
				</>
			</ScrollView>
			<Contact />
		</>
	);
};

export default ProductsScreen;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	productCard: {
		width: width * 1 - 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerMain: {
		width: width,
		height: width / 4 - 25,
		backgroundColor: '#fff',
		elevation: 8,
		paddingVertical: 25,
		paddingHorizontal: 10,
	},
	headerFlex: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchBox: {
		width: width - 40,
		height: width / 7 - 15,
		backgroundColor: '#e5e5e5',
		marginHorizontal: 10,
		borderRadius: 25,
		fontSize: 15,
		color: '#333',
		paddingHorizontal: 10,
		position: 'relative',
	},
	searchIcon: {
		position: 'absolute',
		bottom: -15,
		right: 15,
	},
});
