import {
	StyleSheet,
	Text,
	View,
	Dimensions,
} from 'react-native';
import React, { useState } from 'react';
var { width } = Dimensions.get('window');
import { Searchbar } from 'react-native-paper';
import ProductCard from '../Home/ProductCard';
import Header from '../Layout/Header';
import Banner from '../Layout/Banner';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeProduct({
	products,
	navigation,
}) {
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
	return (
		<View>
			{/* <Header /> */}
			<View style={{backgroundColor: '#e8e8e8', }}>
				<Text style={{ paddingVertical: 20, paddingTop: 50, paddingHorizontal: 20, fontSize: 30, fontWeight: 'bold' }}>Welcome, { userInfo.name}</Text>
			</View>
			<Banner />
			<View style={styles.container}>
				<Text
					style={{
						fontSize: 25,
						color: '#333',
						textAlign: 'center',
					}}
				>
					Newest products
				</Text>
				<View style={styles.productCard}>
					{products &&
						products
							.slice(0, 6)
							.map((product) => (
								<ProductCard
									key={product._id}
									product={product}
									navigation={navigation}
								/>
							))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: width,
		padding: 10,
		marginVertical: 10,
		marginBottom: width / 2.3,
	},
	productCard: {
		width: width * 1 - 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
