import React, { Component } from 'react';
import { Text } from 'react-native';

class PlayArea extends Component {

	createGame = () => {

		const size = 6;

		return size;
	}

	render() {
		return (
			<Text>
				{this.createGame}
			</Text>
		);
	}

}

export default PlayArea;