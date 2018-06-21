import React, { Component } from 'react';
import { 
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    PanResponder,
    Dimensions,
    Easing,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height } from 'window-size';
import images from './../images/Images';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export class SongScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Button title='Song Screen!' onPress={() => this.props.navigation.navigate('Home')} />
                </View>
                <Animated.View style={styles.imageContainer}>
                    <Animated.Image 
                        source={images.songImage} 
                        style={{
                            height: SCREEN_HEIGHT,
                            width: SCREEN_WIDTH * 3,
                            position: 'absolute'
                        }} 
                    />
                </Animated.View>
            </SafeAreaView>
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