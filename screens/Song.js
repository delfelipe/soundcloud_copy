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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from './../images/Images';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export class SongScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.animation = new Animated.ValueXY({ x: 0, y: 0 });
        this.PanResponder = PanResponder.create({

            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.animation.setValue({ x: 0, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.moveY < SCREEN_HEIGHT && gestureState.dy < 0) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if(gestureState.dy < 0) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if(gestureState.dy > 0) {
                    Animated.spring(this.animation.y, {
                        toValue: SCREEN_HEIGHT - 60,
                        tension: 1
                    }).start();
                }
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.animation.extractOffset();
            }

        });
    }

    constructor() {
        super();
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue, {
                toValue: 1,
                duration: 90000,
                easing: Easing.linear
            }
        ).start(() => this.animate());
    }

    render() {

        marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -SCREEN_WIDTH * 2]
        });

        animatedHeight = {
            transform: this.animation.getTranslateTransform()
        };

        animatedIconOpacity = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - 200, SCREEN_HEIGHT - 60],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        animatedScreenOpacity = this.animation.y.interpolate({
            inputRange: [SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 150, SCREEN_HEIGHT - 60],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        return (
            <SafeAreaView>

                <View style={styles.container}>
                    <Ionicons 
                        style={styles.headerIcon} 
                        name='ios-arrow-back' 
                        size={38} 
                        color={'grey'} 
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Text style={styles.headerText}>Playlist</Text>
                </View>
                <View style={{flex: 1}}></View>

                <Animated.View {...this.PanResponder.panHandlers} style={[ animatedHeight, styles.imageContainer]}>

                    <Animated.Image 
                        source={images.songImage} 
                        style={{
                            marginLeft,
                            height: SCREEN_HEIGHT,
                            width: SCREEN_WIDTH * 3,
                            position: 'absolute'
                        }} 
                    />

                    <Animated.View style={[ styles.upperMostIcons, {opacity: animatedIconOpacity }]}>

                        <TouchableOpacity>
                            <MaterialIcons name={'play-arrow'} size={30} style={{color: 'white'}}/>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity>
                                <Text style={styles.upperSongTitle}>Eternity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.upperSongTitle}>Stellardrone</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <MaterialCommunityIcons name={'heart'} size={20} style={{color: 'white'}}/>
                        </TouchableOpacity>

                    </Animated.View>

                    <Animated.View style={[ styles.upperIcons, { opacity: animatedScreenOpacity }]}>

                        <Animated.View style={styles.upperLeftIcons}>
                            <TouchableOpacity>
                                <Text style={styles.artistName}>Stellardrone</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.songTitle}>Eternity</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name={'chevron-down'} size={40} style={styles.upperRightIcons}/>
                            </TouchableOpacity>
                        </Animated.View>

                    </Animated.View>

                    <Animated.View style={[ styles.lowerIcons, { opacity: animatedScreenOpacity }]}>
                        <Animated.View style={styles.lowerIconsWrapper}>

                            <TouchableOpacity style={styles.likes}>
                                <MaterialCommunityIcons name={'heart'} size={25} style={{color: 'white'}}/>
                                <Text style={{color: 'white'}}>1,414</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <MaterialCommunityIcons name={'share'} size={25} style={{color: 'white'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <MaterialCommunityIcons name={'repeat-once'} size={25} style={{color: 'white'}}/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <MaterialIcons name={'more-horiz'} size={25} style={{color: 'white'}}/>
                            </TouchableOpacity>

                        </Animated.View>
                    </Animated.View>

                </Animated.View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#999',
        marginTop: 50,
        alignItems: 'center'
    },
    headerIcon: {
        marginLeft: 10,
        marginRight: 135
    },
    headerText: {
        fontSize: 8,
        color: '#444'
    },
    imageContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT
    },
    upperMostIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 12
    },
    songNameAndArtistName: {
        alignItems: 'center'
    },
    upperSongTitle: {
        color: 'white'
    },
    upperArtistName: {
        color: 'white',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    upperIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    upperLeftIcons: {
        flexDirection: 'column'
    },
    artistName: {
        backgroundColor: '#000',
        color: '#fff',
        marginLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    songTitle: {
        backgroundColor: '#000',
        color: '#fff',
        marginLeft: 15,
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    upperRightIcons: {
        color: '#fff',
        marginRight: 10
    },
    lowerIcons: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40
    },
    lowerIconsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});