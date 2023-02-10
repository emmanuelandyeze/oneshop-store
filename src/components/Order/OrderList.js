import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { DataTable } from 'react-native-paper';

const OrderList = ({ navigation, order }) => {
	return (
		<View>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('Order', {
						order: order,
					})
				}
			>
				<DataTable.Row>
					<DataTable.Cell>{order._id}</DataTable.Cell>
					<DataTable.Cell>
						₦{order.totalPrice}
					</DataTable.Cell>
					{order.isPaid ? (
						<DataTable.Cell
							style={{
								backgroundColor: '#72B541',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ color: '#fff' }}>
								Paid
							</Text>
						</DataTable.Cell>
					) : (
						<DataTable.Cell
							style={{
								backgroundColor: 'red',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							Not Paid
						</DataTable.Cell>
					)}
					{order.isDelivered ? (
						<DataTable.Cell
							style={{
								backgroundColor: '#72B541',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ color: '#fff' }}>
								Delivered
							</Text>
						</DataTable.Cell>
					) : (
						<DataTable.Cell
							style={{
								backgroundColor: 'gold',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							Not Delivered
						</DataTable.Cell>
					)}
				</DataTable.Row>
			</TouchableOpacity>
		</View>
	);
};

export default OrderList;

const styles = StyleSheet.create({});
