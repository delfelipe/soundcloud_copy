import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class SongScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title='Song Screen!' onPress={() => this.props.navigation.navigate('Home')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});