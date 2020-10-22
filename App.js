/*


- Szintek teljesítésével gyorsuló idő
- Nehézségi szint kiválasztása

*/

// TODO: TISZTA KÓD - RETEK RONDÁN NÉZ KI DE NINCS IDŐM JAVÍTANI ÁÁÁÁH

import React, { useState, setState, useEffect, Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import InGame from './src/Components/InGame'
import Difficulties from './src/Components/Difficulties'

class App extends Component {


	state = {

		selectedSize: 0,
		InGame: false,
		startingGame: false,
		board: []
	}

	
	startGame = () => {
		this.setState((state) => {
			return {
				startingGame: true
			}
		})
	}

	generatePlay = () => {
		const size = this.state.selectedSize

		alert(`A kiválasztott játékterület mérete: ${this.state.selectedSize}`)

		let render = []

		for (let y = 0; y < size; y++) {
			let row = []

			for (let x = 0; x < size; x++) {
				row.push(
					<Button title="tile"/>
				)
			}

			render.push(
				<View>
					{row}
				</View>
			)
		}

		return render;
	}



	setDifficulty = (difficulty) => {

		this.setState((state) => {
			return {
				startingGame: false,
				InGame: true,
				selectedSize: difficulty
			}
		})
	}










	displayBoard = () => {
		let render = []

		this.state.board.map((tile, index) => {
			render.push(
				<Text>{index}</Text>
			)
		})

		return render
	}





	render() {
		
		return (
			<View style={styles.container}>

				{!(this.state.InGame || this.state.startingGame) ?
				<View>

					<Text style={styles.title}>Memóriajáték</Text>
					<Button onPress={() => this.startGame()} style={{
						zIndex: -1
					}} title="Új játék indítása"/>

				</View> : null}
				
				{this.state.startingGame ? <Difficulties callback={this.setDifficulty}/> : null}

				{this.state.InGame ? <InGame size={this.state.selectedSize}/> : null}

			</View>
		)
	}

}

export default App;





const styles = StyleSheet.create({

	container: {
		alignItems: 'center',
		justifyContent: 'center',
		color: "mintcream",
		backgroundColor: "#30336b",
		flex: 1
	},

	title: {
		fontSize: 26,
		fontWeight: "700",
		color: "mintcream",
		paddingVertical: 18
	},

	footer: {
		position: "absolute",
		width: "100%",
		padding: 12,
		bottom: 0,
		backgroundColor: "black",
	},

	modal: {
		padding: 12,
		backgroundColor: "white"
	},
	
	difficulty: {
		marginVertical: 8
	},
	difficultiesTitle: {
		fontSize: 18,
		marginBottom: 12
	}
})