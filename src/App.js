import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import PlayArea from './PlayArea';
import Difficulity from './Components/Difficulity';

class App extends Component {

	startGame = () => {
		alert("Új játék kezdése...")
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Memóriajáték</Text>
				<Button onPress={this.startGame} title="Új játék indítása"/>

				<Text>A játékterület mérete: {size * size}</Text>

				<View style={styles.playArea}>
					<PlayArea></PlayArea>
				</View>

				<View>
					<Difficulity/>
				</View>
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

	title: {
		fontSize: 26,
		fontWeight: 600,
		paddingVertical: 16
	},

	playArea: {
		backgroundColor: "gray",
		padding: 6,
		marginVertical: 26
	}
});



export default App;