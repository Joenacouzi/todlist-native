import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({ label, style, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, style]} {...props} />
            {props.infoText && <Text style={styles.infoText}>{props.infoText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 7,
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    infoText: {
        color: 'blue', // Text color for the info message
        fontSize: 14,
    }
});

export default Input;