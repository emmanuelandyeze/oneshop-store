import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { DataTable } from 'react-native-paper';
import OrderList from '../components/Order/OrderList';
import { useSelector } from 'react-redux';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout),
	);
};

const OrderListScreen = ({ navigation }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const [isLoading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const fetchData = async () => {
		const resp = await fetch(
			`https://oneshopadmin.herokuapp.com/api/orders/myorders`,
			{
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			},
		);
		const orders = await resp.json();
		setOrders(orders);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={{ paddingTop: 30, paddingHorizontal: 10, paddingBottom: 40 }}>
			<View style={styles.productDetailsTop}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-back" color="#333" size={30} />
				</TouchableOpacity>
			</View>
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
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<DataTable style={styles.container}>
						<DataTable.Header style={styles.tableHeader}>
							<DataTable.Title>Order Id</DataTable.Title>
							<DataTable.Title>Total Price</DataTable.Title>
							<DataTable.Title>
								Payment
							</DataTable.Title>
							<DataTable.Title>Status</DataTable.Title>
						</DataTable.Header>
						<>
							{isLoading ? (
								<Text>Loading</Text>
							) : (
								<View>
									{orders &&
										orders.map((order) => (
											<OrderList
												key={order._id}
												order={order}
												navigation={navigation}
											/>
										))}
								</View>
							)}
						</>
					</DataTable>
				)}
			</ScrollView>
		</View>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({
	scrollView: {
		// alignSelf: 'center',
		height: '100%',
		paddingBottom: 30,
	},
	contentContainer: {
		// justifyContent: 'center',
		// alignItems: 'center',
	},
});
