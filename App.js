import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TimerEntry from './components/TimerEntry';
import CountDown from './components/CountDown';
import CountdownControlButton from './components/CountdownControlButton';
import { vibrate } from './utils';

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

	updateRemainingSeconds = (timerName) => (seconds) => {
		if (this.state.actualTimer === timerName) {
			this.setState({remainingSeconds: seconds});
		}

		timerName === 'work' ?
			this.setState({workSeconds: seconds})
			: this.setState({breakSeconds: seconds});
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
		const isThereTimeLeft = this.state.remainingSeconds > 0;
		if (isThereTimeLeft) {
			this.setState({
				remainingSeconds: this.state.remainingSeconds - 1
			});
			
			this.canVibrate();
		} else {
			this.stopTimer();
			this.changeTimer();
			this.startTimer();
		}
	}

	canVibrate = () => {
		if (this.state.remainingSeconds === 0) {
			vibrate();
		}
	}

	changeTimer = () => {
		const newTimer = this.state.actualTimer === 'work' ? 'break' : 'work';
		this.setState({actualTimer: newTimer});

		const secs = newTimer === 'work' ? this.state.workSeconds : this.state.breakSeconds;
		this.setState({remainingSeconds: secs});
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
				<TimerEntry 
					title='Work timer:' 
					onChange={this.updateRemainingSeconds('work')}
				/>
				<TimerEntry 
					title='Break timer:' 
					onChange={this.updateRemainingSeconds('break')}
				/>
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
