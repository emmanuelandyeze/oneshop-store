import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getProduct } from '../../Redux/Actions/ProductAction';
import HomeProduct from '../components/Home/HomeProduct';
import Contact from '../components/Home/Contact';
import Header from '../../src/components/Layout/Header';
const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const [isLoading, setLoading] = useState(true);
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

	const [refreshing, setRefreshing] = React.useState(false);

	return (
		<>
			{isLoading ? (
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
				<View>
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
						<HomeProduct
							products={products.products}
							navigation={navigation}
						/>
					</ScrollView>
				</View>
			)}
			<Contact />
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	scrollView: {
		alignSelf: 'center',
		height: '100%'
	},
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
