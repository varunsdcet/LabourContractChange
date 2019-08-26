import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
type Props = {};
import stringsoflanguages from './Local';
const GLOBAL = require('./Global');
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import axios from "react-native-axios";
export default class StautaryReport extends Component {
    state = {
        text: '',
        username: [],
        project: '',
        location :'',
        ipAdd : '',
        loading:'',
        visible:false,
        moviesList :[
            {
                title :stringsoflanguages.attendancesheet,
                selected :'#E9ECF7',
                image:require('./r1.png')
            },

            {
                title :stringsoflanguages.wage,
                selected :'#F8FBF5',
                image:require('./r2.png')
            },
            {
                title :stringsoflanguages.pf,
                selected :'#FFFBF7',
                image:require('./r4.png')
            },
            {
                title :stringsoflanguages.esi,
                selected :'#FEF8F4',
                image:require('./r3.png')
            },



        ],
        results: [],
        selected:[],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {

        if (index == 0){
            this.props.navigation.navigate("AttendanceReport")
        }else if (index == 1){
            this.setState({visible:true})
           // this.props.navigation.navigate("WageRegister")
        }else if (index == 2){
            this.props.navigation.navigate("PFRemittance")
        }else if (index == 3){
            this.props.navigation.navigate("Approvals")
        }else if (index == 4){
            this.props.navigation.navigate("DailyLabourReport")
        }else if (index == 5){
            this.props.navigation.navigate("DailyProgressReport")
        }




    }
    _renderItem = ({item,index}) => {


        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>


                <View style = {{height :132 ,backgroundColor:"white",width:window.width/2 -20,marginLeft :13,borderRadius:12,marginTop:12,marginBottom:12}}>

                    <Image style = {{width :40 ,height: 40,marginLeft:20,marginTop:14,resizeMode: 'contain'}}
                           source={item.image}/>

                    <View style = {{margin:10,marginTop:20 ,backgroundColor:item.selected,borderRadius:12,height:48}}>

                        <Text style = {{color:'#042C5C',fontSize:14,margin:10,fontFamily:'AvenirLTStd-Medium'}}>
                            {item.title}
                        </Text>
                        <Text style = {{color:'#77869E',fontSize: 12,marginLeft:10,marginTop:-6,fontFamily:'AvenirLTStd-Medium'}}>
                            {stringsoflanguages.click}
                        </Text>

                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {
        alert(JSON.stringify(res))

        this.hideLoading()
        if (res.status == 200) {
            var responseArray = res["data"]
            if (responseArray.length != 0) {
                var responseDict = responseArray[0]

                this.setState({username: responseDict})
            }

        } else {
            alert(stringsoflanguages.unable)
        }
    }

    loadHome()
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'profile';
        axios.post(url, {
            user_id: GLOBAL.userID,

        })
            .then(function (response) {

                self.myCallbackFunctions(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }


    getSelections = (type) =>{
        if (type == "2"){
            this.setState({visible:false})
            this.props.navigation.navigate("WageRegister")
        }else{
            this.setState({visible:false})
            this.props.navigation.navigate("MusterUpload")
        }

    }
    componentDidMount(){
        this.loadHome()
    }
    _handlePress() {
        console.log('Pressed!');
        this.props.navigation.navigate('Location')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>




                    <View style = {{flexDirection:  'row',marginTop:20}}>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>

                            <Image style = {{width :30 ,height: 30,marginLeft:20,resizeMode: 'contain'}}
                                   source={require('./back.png')}/>

                        </TouchableOpacity>


                        <Text style = {{marginLeft: 12,width:300,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',marginTop:4}}>
                            {stringsoflanguages.statutory}

                        </Text>



                    </View>



                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.moviesList}
                              numColumns={2}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                    />


                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>

                            <View style = {{width: window.width - 100}}>

                                <Image style = {{width :80 ,height :80,alignSelf:'center',resizeMode:'contain',marginTop:30}}
                                       source={require('./create-request-pop-img.png')}/>

                                <Text style = {{margin:10,textAlign: 'center',color:'#006FA5',fontSize: 18,marginTop: 12,fontFamily:'AvenirLTStd-Heavy'}}>
                                    {stringsoflanguages.mustersheet}

                                </Text>


                                <TouchableOpacity onPress={() => this.getSelections('2')
                                }>
                                    <View style = {{flexDirection:'row'}}>

                                        <Image style = {{width :20 ,height :20,margin:10,resizeMode:'contain'}}
                                               source={require('./checkbox-blank-outline.png')}/>

                                        <Text style = {{marginLeft:10,color:'#77869E',fontSize: 13,fontFamily:'AvenirLTStd-Heavy',marginTop:14}}>
                                            {stringsoflanguages.downloads}

                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.getSelections('1')
                                }>

                                    <View style = {{flexDirection:'row'}}>

                                        <Image style = {{width :20 ,height :20,margin:10,resizeMode:'contain'}}
                                               source={require('./checkbox-blank-outline.png')}/>

                                        <Text style = {{marginLeft:10,color:'#77869E',fontSize: 13,fontFamily:'AvenirLTStd-Heavy',marginTop:14}}>
                                            {stringsoflanguages.uploadsig}

                                        </Text>
                                    </View>
                                </TouchableOpacity>




                            </View>
                        </DialogContent>
                    </Dialog>


                </View>


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#F6F8F9',
        height:'100%',
        width:window.width,
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})