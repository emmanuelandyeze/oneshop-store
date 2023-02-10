import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../Home/ProductCard';

const PendingProducts = () => {
	const { user } = useSelector((state) => state.user);

	const [isLoading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	console.log(products);

	const fetchData = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/v2/pending-products/${user._id}`,
		);
		const products = await resp.json();
		setProducts(products);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<View>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Pending Products
			</Text>
			{isLoading ? (
				<Text>Loading</Text>
			) : (
				<View style={styles.productCard}>
					{products.products &&
						products.products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
							/>
						))}
				</View>
			)}
		</View>
	);
};

export default PendingProducts;

const styles = StyleSheet.create({});
