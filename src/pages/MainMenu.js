import React, { Component } from 'react';
// import api from '../services/api';
// import socket from 'socket.io-client';

import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	AsyncStorage,
	TextInput
} from 'react-native';

import api from '../services/api';

export default class MainMenu extends Component {
	state = {
		options: {
			host: '',
			auth: ''
			// l1: {},
			// l2: {}
		},
		l1: '',
		l2: '',
		iplData: {},
		response:false
	};
	goBack = () => {
		this.props.navigation.pop();
	};
	async componentDidMount() {
		let host = await AsyncStorage.getItem('@zh:host');
		let username = await AsyncStorage.getItem('@zh:username');
		let password = await AsyncStorage.getItem('@zh:password');
		this.setState({
			options: {
				host,
				auth: `${username}:${password}`
			},
			iplData: {}
			
		});
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Lets Z!',
		headerRight: (
			<TouchableOpacity onPress={this.goBack}>
				{/* <Text>back</Text> */}
				{/* <Icon
					name="add-circle-outline"
					size={24}
					color="#4BB0EE"
					style={{ marginRight: 10 }}
				/> */}
			</TouchableOpacity>
		)
	});

	iplValidate = async () => {
		// if (!this.state.l1.length || !this.state.l2.length) return;
		let { l1 } = this.state;
		let { l2 } = this.state;

		let options = {};
		options.hostname = this.state.options.host;
		options.auth = this.state.options.auth;
		options.l1 = { unit: '' };
		options.l1.unit = l1;
		options.l2 = { parm: '' };
		options.l2.parm = l2;

		// this.setState({ options: { l1:{unit:l1} } });
		// this.setState({ options: { l2:{parm:l2} } });

		// let options = this.state.options
		console.log('options', options);
		api
			.post('iplcheck', options)
			.then(res => {
				this.setState({ iplData: res.data });
				console.log(this.state.iplData);
				this.setState({response:true})
				this.render()
			})
			.catch(function (error) {
				console.log(error);
			  });
	};

	handleInputL1 = l1 => {
		this.setState({ l1 });
	};
	handleInputL2 = l2 => {
		this.setState({ l2 });
	};

	viewResponse = () =>{
		let ok = ''
		if(this.state.response){
			if(this.state.iplData.l1.isNucleusPresent) ok = 'ok'
			else( ok = 'nok')
		return (
			<View>
				<Text>SYS1.NUCLEUS on L1:{`${ok}`}</Text>
				<Text>LOAD{`${this.state.iplData.l2.load}`} on volume{`${this.state.iplData.l2.volser}`}</Text>
				<Text>On library: {`${this.state.iplData.l2.loadLocation}`}</Text>
				<Text>Content:{`\n${this.state.iplData.l2.content}`}</Text>
			</View>
		)}
	}
	render() {
		return (
			<View style={styles.container}>
				{/* <FlatList
					data={this.state.tweets}
					keyExtractor={tweet => tweet._id}
					renderItem={({ item }) => <Tweet tweet={item} />}
				/> */}
				{/* <Text>{this.state.options}</Text> */}
				<TextInput
					style={styles.input}
					placeholder="Load Address"
					value={this.state.l1}
					onChangeText={this.handleInputL1}
					onSubmitEditing={this.iplValidate}
					returnKeyType="send"
				/>
				<TextInput
					style={styles.input}
					placeholder="Load Parm"
					value={this.state.l2}
					onChangeText={this.handleInputL2}
					onSubmitEditing={this.iplValidate}
					returnKeyType="send"
				/>
				<TouchableOpacity onPress={this.iplValidate} style={styles.button}>
					<Text style={styles.buttonText}>IPL Validate</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={styles.button}>
					<Text style={styles.buttonText}>Send Commands</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.render} style={styles.button}>
					<Text style={styles.buttonText}>See Dataset</Text>
				</TouchableOpacity>
				<View>
					{this.viewResponse()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		padding: 30
	},
	button: {
		height: 44,
		alignSelf: 'stretch',
		marginTop: 10,
		backgroundColor: '#97C986',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold'
	},
	input: {
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 5,
		height: 44,
		paddingHorizontal: 15,
		alignSelf: 'stretch',
		marginTop: 10
	}
});
