import React, { Component } from 'react'
import { View, Text, FlatList, Button, SafeAreaView, TouchableOpacity, StyleSheet, Alert, Dimensions} from 'react-native'


class App extends Component {


	generateRandom = () => {
		const max = this.state.size * this.state.size
		const selected = Math.floor(Math.random() * max);

		console.info(`A véletlenszerűen generált szám: ${selected})`)
		return selected
	}



	initBoard = () => {
		let clone = []
		for (let i = 0; i < (this.state.size * this.state.size); i++) {
			clone.push({
				isHighlighted: false,
			})
		}

		this.setState({
			board: clone
		})
	}

	componentDidMount() {
		this.launchGame()
	}




	nextLevel = () => {

		// init
		this.setState({
			memorizeTime: (this.state.memorizeTime * 0.8),
			currentStep: 0
		})

		// clear board
		this.initBoard()


		// get randoms
		let rands = []
		for (let i = 0; i < this.state.steps; i++) {
			rands.push(this.generateRandom())
		}

		// var numbers = rands

		this.setState({
			memorizeTiles: rands
		})

		// console.log(this.state.memorize)



		// display thingy-things
		const countdown = setInterval(() => {
		
			this.initBoard()

			if (this.state.currentlyAt < rands.length) {

				console.info(`A jelenleg kiválasztott azonosító: ${rands[this.state.currentlyAt]}`)

				this.highlightTile(rands[this.state.currentlyAt])

				this.setState(state => {
					return {
						currentlyAt: (this.state.currentlyAt + 1)
					}
				})

				

			} else {
				this.setState({
					currentlyAt: 0
				})

				clearInterval(countdown)
			}
	
		}, this.state.memorizeTime * 1000)
			
	}




	launchGame = () => {

		// pontok nullázása
		this.setState({
			score: 0,
			memorizeTime: 1
		})

		this.nextLevel()

	}



	restartGame() {
		this.launchGame()
	}



	

	constructor(props) {
		super(props)

		const steps = 3
		const size = props.size


		console.info("Játék elindítása...")
		
		// state kiírása
		this.state = {
			board: [],
			size: size,

			memorizeTime: 1,
			memorize: [],
			currentlyAt: 0,
			steps: steps,
			score: 0,
			currentStep: 0
		}



		// this.launchGame()


	}

	




	renderItem = (data) => {
		return (
			<TouchableOpacity onPress={() => this.tilePress(data.index)} style={[styles.tile, (data.item.isHighlighted && styles.highlighted)]}>
				<Text></Text>
			</TouchableOpacity>
		)
	}






	highlightTile = (tileId) => {
		console.info(`A ${tileId} kijelölése...`)

		let clone = this.state.board
		clone[tileId].isHighlighted = true

		this.setState({
			board: clone
		})
	}









	gameOver = () => {
		Alert.alert(
			"A játéknak vége!",
			`Az elért eredményed: ${this.state.score}`, [
				{
					text: "Újrapróbálkozás",
					onPress: () => this.launchGame(),
				}, {
					text: "Kilépés"
				}
			],
			{
				cancelable: false
			}
		);
	}



	tilePress = (tileId) => {
		console.info(`Megnyomott csempe! (Azonosító: ${tileId})`)
		console.info(this.state.memorizeTiles)

		if (this.state.memorizeTiles[this.state.currentStep] == tileId) {

			this.setState({
				currentStep: (this.state.currentStep + 1),
				score: (this.state.score + 1)
			})

			console.info(`Jelenlegi lépések: ${this.state.currentStep}`)
			if (this.state.currentStep == (this.state.steps - 1)) {
				console.info("Pálya kijátszva! Újraázás...")
				this.nextLevel()
			}

		} else {
			console.info("A játéknak vége!")
			this.gameOver()
		}
	}








	render() {
		return (
			<View style={styles.container}>
				<FlatList style={{
					flex: 1,
					padding: 4,
				}} contentContainerStyle = {{ justifyContent: "center", alignItems: "strech", flex: 1}} columnWrapperStyle={{flexGrow: 1}} numColumns={this.state.size} data={this.state.board} extraData={this.state} renderItem={item => this.renderItem(item)} keyExtractor={(item, index) => `${index}`}/>
				<View style={styles.footer}>
					<Text>Pontszám: {this.state.score}</Text>
				</View>
			</View>
		)
	}

}

export default App



const styles = StyleSheet.create({

	container: {
		flex: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "white",
	},

	tile: {
		margin: 4,
		paddingVertical: 26,
		flex: 1,
		backgroundColor: "darkgray"
	},

	board: {
		flex: 1,
		height: 280,
		padding: 6
	},

	footer: {
		backgroundColor: "gray",
		padding: 8,
		textAlign: "center",
	},

	highlighted: {
		backgroundColor: "gray"
	}
})