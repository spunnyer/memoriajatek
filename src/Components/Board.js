import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'


class Board extends Component {

	state = {
		board: [],
		message: "Üzi"
	}

	constructor() {
		super()
	}

	display = () => {

		let board = []

		for (let row = 0; row < 2; row++) {
			for (let column = 0; column < 2; column++) {
				board.push({
					isHighlighted: false
				})
			}
		}

		this.setState({
			message: "oksam",
			board: board
		})
	}

	highlightTile = (tileId) => {

		let board = this.state.board

		board[tileId].isHighlighted = true

		this.setState({
			board: board
		})
	}

	render() {

		let render = []

		this.state.board.map((tile, index) => {
			render.push(
				<TouchableOpacity onPress={() => this.highlightTile(index)} key={index} style={{
					flex: 1
				}}>
					{tile.isHighlighted ? <Text>Kijelölve</Text> : <Text>SEMMI</Text>}
				</TouchableOpacity>
			)
		})

		return (
			<View style={styles.container}>
				<Text>
					{render}
				</Text>
				<View>
					<Button onPress={() => this.display()} title="Megjelenítés"></Button>
					<Button onPress={() => this.highlightTile(2)} title="Kijelölés"/>
				</View>
			</View>
		)
	}

}

export default Board





const styles = StyleSheet.create({

	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		zIndex: 500,
		backgroundColor: 'white',
		alignItems: 'center',
		width: "100%",
		height: "100%"
	},

})

