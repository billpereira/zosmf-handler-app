import React, { Component } from 'react';

import {
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
	Text,
	AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import styles from './styles';

export default class Login extends Component {
	state = {
		host: '',
		username: '',
		password: ''
	};

	handleInputUser = username => {
		this.setState({ username });
	};

	handleInputHost = host => {
		this.setState({ host });
	};

	handleInputPassword = password => {
		this.setState({ password });
	};

	handleLogin = async () => {
		const { username } = this.state;
		const { password } = this.state;
		const { host } = this.state;

		if (!username.length || !password.length || !host.length) return;

		await AsyncStorage.setItem('@zh:username', username);
		await AsyncStorage.setItem('@zh:password', password);
		await AsyncStorage.setItem('@zh:host', host);

        

		this.props.navigation.navigate('MainMenu');
	};

	async componentDidMount() {
		const username = AsyncStorage.getItem('@omnistack:username');
		if (username) {
			this.props.navigation.navigate('App');
		}
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.content}>
					<View style={styles.z_logo}>
						<Text style={styles.text_logo}>zH</Text>
						{/* <Icon name="twitter" size={64} color="#4BB0EE" /> */}
					</View>
					<TextInput
						style={styles.input}
						placeholder="hostname 121.121.121.121"
						value={this.state.host}
						onChangeText={this.handleInputHost}
						onSubmitEditing={this.handleLogin}
						returnKeyType="send"
					/>
					<TextInput
						style={styles.input}
						placeholder="tso user"
						value={this.state.username}
						onChangeText={this.handleInputUser}
						onSubmitEditing={this.handleLogin}
						returnKeyType="send"
					/>
					<TextInput
						style={styles.input}
						placeholder="password"
						value={this.state.password}
						onChangeText={this.handleInputPassword}
						onSubmitEditing={this.handleLogin}
						returnKeyType="send"
						secureTextEntry={true}
					/>
					<TouchableOpacity onPress={this.handleLogin} style={styles.button}>
						<Text style={styles.buttonText}>Let's Z!</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	text_logo: {
		color: '#fff',
		fontSize: 30
	},
	z_logo: {
		width: 80,
		height: 80,
		backgroundColor: '#000',
		fontSize: 26,
		margin: 30,
		alignItems: 'center',
		borderRadius: 16,
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},

	content: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 30,
		paddingTop: 120
	},

	input: {
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 5,
		height: 44,
		paddingHorizontal: 15,
		alignSelf: 'stretch',
		marginTop: 10
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
	}
});
