import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { useState } from 'react';
import { useEffect } from 'react';

var { width } = Dimensions.get('window');

export default function Banner() {
	const [BannerData, setBannerData] = useState([]);

	useEffect(() => {
		setBannerData([
			'https://scontent.flos1-2.fna.fbcdn.net/v/t1.6435-9/75572062_413288529350332_5834831681432846336_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeESchvCe7fDrz6QgcKwUQJRHbCkRfcY38UdsKRF9xjfxVlK-2nPWdUL2U1vOGP2l9dlevmgfgFOCwSCox1FmRCP&_nc_ohc=sbc8TwrRbkIAX_n5gt9&_nc_ht=scontent.flos1-2.fna&oh=00_AT_UWphvXcQ9H-bdF0PN3C6WivQRtfZuj32Vql9NUpDcHQ&oe=630F3367',
			'https://scontent.flos1-2.fna.fbcdn.net/v/t1.6435-9/75627303_412658796079972_5011854306148614144_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGrb9PVZ3-qNxQuIfJ07oLu9_o1Du_xsk_3-jUO7_GyT27Nq9UWDOfxeZGkVx0WRDKuyY9_SjgmwXgFswInl2kK&_nc_ohc=lE8tYvLeQmAAX_191Jr&_nc_oc=AQlmkgRkf8-qCULRHS55YnRGG55GwD4Q36r4UAzx2D6OGeUXccX8OM9ysKRt45wdOBs&_nc_ht=scontent.flos1-2.fna&oh=00_AT9G6fv72tErjTS3_noFLR3bRpXIXz5re4HXkmIjVpq4KA&oe=630D7E8D',
			'https://scontent.flos1-1.fna.fbcdn.net/v/t1.6435-9/73123157_401194087226443_5655929719275651072_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHVVT9QQ3Ba0Qm63hp0asOOQvg71Y4RrbNC-DvVjhGtsxVW5Qvuw8tGAncQFJCsrSbnRVOFlYDKujVICVGccRqt&_nc_ohc=Bkjs5NqtP1MAX82lSDP&_nc_ht=scontent.flos1-1.fna&oh=00_AT--XDNovFyCAo9iSrpwXfrB8ANlxuFoZ-xL9yg4YKHQnA&oe=630C80F4',
			'https://scontent.flos1-2.fna.fbcdn.net/v/t1.6435-9/74328529_404331800246005_6105646768358162432_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeG_0q8JrrxbI3buoIOwZsStj_xz3J3ZwMiP_HPcndnAyH_Z03rtcnrpnRhUdFgti96P-i_CSzht8ercd9PdjYVK&_nc_ohc=c9KHMrIXUu4AX-qYIuX&_nc_ht=scontent.flos1-2.fna&oh=00_AT_ZXjERbOkvbrY_lvVt0uxDlUVhaVYG5HHKesfSEyiKTQ&oe=630B7BAE',
		]);
		return () => {
			setBannerData([]);
		};
	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.swiper}>
					<Swiper
						showButtons={false}
						autoplay={true}
						autoplayTimeout={4}
						style={{
							height: width / 2,
						}}
					>
						{BannerData.map((item) => {
							return (
								<Image
									key={item}
									resizeMode="contain"
									source={{ uri: item }}
									style={styles.banner}
								/>
							);
						})}
					</Swiper>
					<View style={{ height: 20 }}></View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e5e5e5',
	},
	swiper: {
		width: width,
		marginTop: '5%',
		alignItems: 'center',
	},
	banner: {
		height: width / 2,
		width: width - 40,
		borderRadius: 10,
		marginHorizontal: 20,
	},
});
