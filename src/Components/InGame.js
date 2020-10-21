import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native'

class InGame extends Component {

	constructor(props) {
		super(props)
		this.size = props.size

		this.createNet()
		this.initGame()
	}

	state = {
		steps: 3,
		currentlyDisplaying: 0,
		memorizeTime: 1.5,

		memorizeTiles: [],

		score: 0,
		currentStep: 0
	}


	tilePress = (ID) => {
		// alert(`Megnyomott csempe! (Azonosító: ${ID})`)

		if (this.state.memorizeTiles[this.state.currentStep] == ID) {
			// alert("SIKER!")
			this.setState(state => {
				return {
					currentStep: (this.state.currentStep + 1),
					score: (this.state.score + 1)
				}
			})
		} else {
			this.gameOver()
		}
	}


	createNet = () => {
		this.net = []

		for (let y = 0; y < this.size; y++) {
			var row = []

			for (let x = 0; x < this.size; x++) {
				const ID = (y * this.size) + x

				row.push(
					<TouchableOpacity style={{
						flex: 1,
						backgroundColor: "darkgray",
						margin: 6
					}} onPress={() => this.tilePress(ID)}><Text>{ID}</Text></TouchableOpacity>
				)
			}

			this.net.push(
				<View style={{
					flex: 1,
					flexDirection: "column"
				}}>
					{row}
				</View>
			)
		}

	}



	generateRandom = () => {
		const max = this.size * this.size
		const selected = Math.floor(Math.random() * max);

		// alert(`Kiválasztott csempe: ${selected} (Maximum kiválaszható: ${max})`)
		return selected
	}


	gameOver = () => {
		Alert.alert(
			"A játéknak vége!",
			`Az elért eredményed: ${this.state.score}`, [
				{
					text: "Újrapróbálkozás",
				}, {
					text: "Kilépés"
				}
			],
			{
				cancelable: false
			}
		);
	}




	initGame = () => {

		let numbers = []

		for (let i = 0; i < this.state.steps; i++) {
			numbers.push(this.generateRandom())
		}

		// alert(numbers)
		this.state.memorizeTiles = numbers

		
		const countdown = setInterval(() => {
		
			if (this.state.currentlyDisplaying < numbers.length) {

				alert(`A jelnleg kiválasztott azonosító: ${numbers[this.state.currentlyDisplaying]}`)

				this.setState(state => {
					return {
						currentlyDisplaying: (this.state.currentlyDisplaying + 1)
					}
				})

			} else {
				this.state.currentlyDisplaying = 0
				clearInterval(countdown)
			}
	
		}, this.state.memorizeTime * 1000)

	}



	render() {

		

		return (
			<View style={styles.container}>
				<View style={styles.playArea}>
					<View style={{
					width: "100%",
					height: "100%",
					flexDirection: "row",
					alignSelf:'stretch'
				}}>
					{this.net}
					</View>
				</View>
			</View>
		)
	}

}




const styles = StyleSheet.create({

	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: "100%",
		height: "100%"
	},

	playArea: {
		backgroundColor: "white",
		flex: 1,
		width: "100%",
		height: "100%",
		padding: 6
	}
})




export default InGame;