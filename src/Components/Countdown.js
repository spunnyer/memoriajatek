import React, { Component, setState, useEffect } from 'react'
import { View, Text } from 'react-native'


class Countdown extends Component {

	constructor() {
		super()

		this.startCountdown()
	}

	state = {
		count: 3
	}

	
	startCountdown = () => {
		
		const countdown = setInterval(() => {
	
			if (this.state.count > 0) {

				this.setState(state => {
					return {
						count: (this.state.count - 1)
					}
				})

			} else {
				clearInterval(countdown)
			}
	
		}, 1000)
	}

	render() {

		
		
		return (
			<View>
				<Text style={{
					fontSize: 26
				}}>{this.state.count}</Text>
			</View>
		)
	}

}

export default Countdown