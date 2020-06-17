import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TimerEntry from './components/TimerEntry';
import CountDown from './components/CountDown';
import CountdownControlButton from './components/CountdownControlButton';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actualTimer: 'work',
			workSeconds: 0,
			breakSeconds: 0,
			remainingSeconds: 0,
			isRunning: false,
		}
	}

	componentWillUnmount = () => {
		this.stopTimer();
	}

	setSeconds = (seconds) => {
		if (this.state.actualTimer === 'work') {
			this.setState({workSeconds: seconds});
		} else {
			this.setState({breakSeconds: seconds});
		}
		this.setState({remainingSeconds: seconds});
	}

	controlTimer = () => {
		this.state.isRunning ? this.stopTimer() : this.startTimer();
	}

	stopTimer = () => {
		this.setState({ isRunning: false });
		clearInterval(this.timer);
	}

	startTimer = () => {
		if(this.state.remainingSeconds <= 0) {
			alert('Please introduce a number of minutes and seconds');
			return;
		}

		this.setState({ isRunning: true });
		this.timer = setInterval(this.decreaseCounter, 1000);
	}

	decreaseCounter = () => {
		if (this.state.remainingSeconds <= 0) {
			this.stopTimer();
		} else {
			this.setState({
				remainingSeconds: this.state.remainingSeconds - 1
			});
		}
	}

	resetTimer = () => {
		const secs = this.state.actualTimer === 'work' ?
			this.state.workSeconds
			: this.state.breakSeconds;
		this.stopTimer();
		this.setState({remainingSeconds: secs});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={[styles.bigFontSize, styles.bold]}>
					{this.state.actualTimer.toUpperCase()} TIMER
				</Text>
				<View style={styles.row}>
					<CountdownControlButton 
						isRunning={this.state.isRunning} onPress={this.controlTimer}
					>
					</CountdownControlButton>
					<Button title="Reset" onPress={this.resetTimer} />
				</View>
				<CountDown time={this.state.remainingSeconds}/>
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
	row: {
		flexDirection: 'row',
	},
	bigFontSize: {
		fontSize: 42,
	},
	bold: {
		fontWeight: 'bold',
	}
});
