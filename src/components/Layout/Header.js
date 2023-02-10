import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
} from 'react-native';
import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ProductCard from '../Home/ProductCard';

var { width } = Dimensions.get('window');
var height = Dimensions.get('window').height;

const Header = ({ navigation }) => {
		const [products, setProducts] = useState([]);
		
	
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

	const [data, setdata] = useState(products);
	const [search, setSearch] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [click, setClick] = useState(false);


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
			{search.length !== 0 ? (
				<>
					<ScrollView
						style={{
							position: 'absolute',
							width: '100%',
							left: 0,
							top: height / 8 - 40,
							zIndex: 100,
							height: height * 1,
							backgroundColor: 'rgba(61, 107, 115, 0.80)',
							paddingVertical: 10,
						}}
					>
						{/* {data.map((product, index) => ( */}
							<View style={styles.ProductCard}>
								{data &&
									data.map((product) => (
										<ProductCard
											key={product._id}
											product={product}
											navigation={navigation}
										/>
									))}
							</View>
						{/* ))} */}
					</ScrollView>
				</>
			) : null}
		</>
	);
};

export default Header;

const styles = StyleSheet.create({
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
	ProductCard: {
		width: width / 2 - 30,
		height: width / 1.7,
		borderRadius: 10,
		elevation: 8,
		backgroundColor: '#e5e5e5',
		flexWrap: 'wrap',
		margin: 10,
	},
	image: {
		width: '100%',
		height: width / 2 - 60,
		resizeMode: 'contain',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
});
