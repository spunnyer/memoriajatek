import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'


class Difficulties extends Component {

	state = {
		difficulties: [
			{
				name: "Könnyű",
				size: 2
			}, {
				name: "Normál",
				size: 3
			}, {
				name: "Nehéz",
				size: 6
			}, {
				name: "EXTRÉM",
				size: 8
			}
		]
	}
	

	

	setDifficulty = (size) => {
		// alert(`A kiválasztott nehézség: ${size}`)
		this.props.callback(size);
	}



	render() {

		let difficulties = []

		this.state.difficulties.map(difficulty => {
			difficulties.push(
				<Button onPress={() => this.setDifficulty(difficulty.size)} key={difficulty.size} title={difficulty.name}/>
			)
		})

		return (
			<View style={styles.container}>
				<View style={styles.modal}>
					<Text style={styles.title}>Válaszd ki a nehézséget!</Text>

					<View>
						{difficulties}
					</View>
				</View>
			</View>
		)
	}

}


const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "600",
		paddingBottom: 18,
		alignSelf: 'stretch',
	},

	container: {
		position: 'absolute',
		zIndex: 100,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},

	modal: {
		backgroundColor: "white",
		padding: 16,
		width: 400,
		marginBottom: 26
	}
})

export default Difficulties