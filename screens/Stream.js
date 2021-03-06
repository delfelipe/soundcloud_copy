import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class StreamScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Stream',
        headerTitleStyle: {
            color: '#444',
            fontWeight: 'normal'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title='Play Song' onPress={() => this.props.navigation.navigate('Song')} />
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