import React from 'react';
import { Button } from 'react-native';

const CountdownControlButton = props => {
	const title = props.isRunning ? 'Pause' : 'Run';

	return <Button title={title} onPress={props.onPress}/>
}

export default CountdownControlButton;