import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import Buttonn from '../components/button/button';
import { user } from '../helpers/helper';
import Input from '../components/input/input'

const SettingsScreen = () => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSave = () => {
        if (!password || !passwordConfirmation) return;
        if (password !== passwordConfirmation) {
            return ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
        }
        ToastAndroid.show('Password Match', ToastAndroid.SHORT)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <Input
                label="Username"
                style={{ color: 'black' }}
                editable={false}
                value={username}
            />
            <Input
                label="Email"
                value={email}
                style={{ color: 'black' }}
                editable={false}
            />
            <Input
                label="New Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Input
                label="Confirm Your Password"
                secureTextEntry={true}
                value={passwordConfirmation}
                onChangeText={(text) => setPasswordConfirmation(text)}
            />
            <Buttonn label="Save Changes" onPress={handleSave} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
});

export default SettingsScreen;