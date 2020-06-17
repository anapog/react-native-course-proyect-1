import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default class TimerEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: 0,
			seconds: 0,
		}
	}

	setMinutes = async (minutes) => {
		this.checkInputValidity(+minutes)
		await this.setState({minutes: +minutes});
		this.updateRemainingSeconds();
	}

	setSeconds = async (seconds) => {
		this.checkInputValidity(+seconds)
		await this.setState({seconds: +seconds});
		this.updateRemainingSeconds();
	}

	updateRemainingSeconds = () => {
		const secs = this.state.minutes*60 + this.state.seconds;
		this.props.onChange(secs);
	}

	checkInputValidity = (num) => {
		if (!Number.isInteger(num)) {
			alert('Please enter a valid number!');
		}
	};

	render() {
		return (	
			<View style={styles.timerEntry}>
				<Text style={styles.bold}>{this.props.title}</Text>
				<TextInput 
					style={styles.input}
					defaultValue={this.state.minutes.toString()}
					placeholder='min' 
					keyboardType='numeric'
					onChangeText={this.setMinutes}/>
				<Text>minutes</Text>
				<TextInput 
					style={styles.input}
					defaultValue={this.state.seconds.toString()}
					placeholder='sec' 
					keyboardType='numeric'
					onChangeText={this.setSeconds}/>
				<Text>seconds</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	timerEntry: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},
	bold: {
		flex: 1,
		minWidth: 60,
		fontWeight: 'bold',
	},
	input: {
		flex: 1,
		minWidth: 40,
		marginRight: 10,
		marginLeft: 10,
		borderBottomWidth: 1,
	},
});