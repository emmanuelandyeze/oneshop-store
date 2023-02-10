import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Ionicons';

const Contact = () => {
    const waurl = 'https://wa.me/2348164092325';
    const fburl =
			'https://www.facebook.com/Oneshopsupplements/';
    const inurl =
			'https://www.instagram.com/oneshopsupplements/?hl=en';

    const onPressWa = () => Linking.canOpenURL(waurl).then(() => {
        Linking.openURL(waurl);
    });
    const onPressFb = () => Linking.canOpenURL(fburl).then(() => {
        Linking.openURL(fburl);
    });
    const onPressIn = () => Linking.canOpenURL(fburl).then(() => {
        Linking.openURL(fburl);
    });
  return (
		<View style={styles.contact}>
			<Text style={{ color: '#fff', marginRight: 5 }}>
				Need help?
			</Text>
			<TouchableOpacity>
				<Icon
					name="logo-whatsapp"
					size={25}
					style={{
						marginRight: 10,
						marginVertical: 5,
						color: '#fff',
					}}
					onPress={onPressWa}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon
					name="logo-facebook"
					size={25}
					style={{
						marginRight: 10,
						marginVertical: 5,
						color: '#fff',
					}}
					onPress={onPressFb}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon
					name="logo-instagram"
					size={25}
					style={{
						marginRight: 10,
						marginVertical: 5,
						color: '#fff',
					}}
					onPress={onPressIn}
				/>
			</TouchableOpacity>
		</View>
	);
}

export default Contact

const styles = StyleSheet.create({
	contact: {
		zIndex: 1000,
		position: 'absolute',
		bottom: 1,
		right: 5,
        backgroundColor: '#72B541',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingVertical: 10,
	},
});