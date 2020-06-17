import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimerEntry from './components/TimerEntry';
import CountDown from './components/CountDown';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actualTimer: 'work',
			workSeconds: 0,
			breakSeconds: 0,
			remainingSeconds: 0,
		}
	}

	setSeconds = (seconds) => {
		if (this.state.actualTimer === 'work') {
			this.setState({workSeconds: seconds});
		} else {
			this.setState({breakSeconds: seconds});
		}
		this.setState({remainingSeconds: seconds});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={[styles.bigFontSize, styles.bold]}>
					{this.state.actualTimer.toUpperCase()} TIMER
				</Text>
				<TimerEntry title='Work timer:' onChange={this.setSeconds}/>
				<TimerEntry title='Break timer:' onChange={this.setSeconds}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bigFontSize: {
		fontSize: 42,
	},
	bold: {
		fontWeight: 'bold',
	}
});
