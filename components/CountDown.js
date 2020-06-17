import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CountDown = props => {
	const minutes = Math.floor(props.time / 60);
	const seconds = props.time % 60;
	const paddingZeroMinutes = minutes < 10 ? '0' : '';	
	const paddingZeroSeconds = seconds < 10 ? '0' : '';	
	return (
		<Text style={styles.bigFontSize}>
			{paddingZeroMinutes}{minutes}:{paddingZeroSeconds}{seconds}
		</Text>
	);
}

const styles = StyleSheet.create({
	bigFontSize: {
		fontSize: 42,
	},
});

export default CountDown;