import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Textinput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    SafeAreaView,
    TextInput
} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import axios from 'react-native-axios';
const GLOBAL = require('./Global');
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
var moment = require('moment');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dialog, {DialogContent} from "react-native-popup-dialog";
import ImagePicker from "react-native-image-picker";
var type = 0;
var tomorrow;
const options = {
    title: 'Select Avatar',

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class MusterUpload extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        catid:'',
        data:[],
        isDateTimePickerVisible: false,
        startDate:'',
        endDate:'',
        date :new Date(),
        mystart :'',
        value:1,
        values:1,
        visible:false,
        pop:'',
        done:false,
        datas:[],
        datass:[],
        moviesList:[],
        selectedCategory:[""],
        monthid:'',
        orderid:'',
        image:'',
        avatarSource:'',

    };
    showDateTimePicker = (types) => {
        type =  types

        if (type == 0){
            var d = new Date();
            d.setDate(d.getDate() + 10);
            this.setState({date:d})
        }else{
            this.setState({date:this.state.mystart})

        }

        this.setState({ isDateTimePickerVisible: true });
    };
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {


        this.setState({ startDate: date.toString() });


        this.hideDateTimePicker();
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


    myCallbackFunctions = (res) => {

        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){

            this.setState({datas:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    loadHome(selectes)
    {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'all_booking_id';
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

    getIndex = (index) => {
        this.setState({orderid:this.state.datas[index].order_id})

        // GLOBAL.bid = this.state.data[index].id

        this.timeoutCheck = setTimeout(() => {
            this.loadHomed();
        }, 400)

        //delay(() => this.loadHomes(GLOBAL.bid), 1000);
        //this.props.navigation.push('NewCate')
    }


    getIndexs = (index) => {
        this.setState({monthid:this.state.data[index].id})



        //   loadHomes(GLOBAL.bid)
        //this.props.navigation.push('NewCate')
    }
    idProff = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                var a  = 'data:image/jpeg;base64,' + response.data
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({image :  a})

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    loadHomes=()=>
    {
        var self=this;
        var url = GLOBAL.BASE_URL + 'getcontractor';
        axios.post(url, {
            order_id: GLOBAL.bid,

        })
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }




    loadHomed()
    {

        var self=this;
        var url = GLOBAL.BASE_URL + 'pf_month';
        axios.get(url)
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }

    hideLoading() {
        this.setState({loading: false})
    }

    getSelection = (index) => {



        Linking.openURL(index.document_pdf)

    }

    _handlePresss =()=> {
        this.setState({visible:false})
        this.setState({done:true})



    }
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(item)
            }>
                <View style = {{width :'100%',backgroundColor:'white',marginTop:15,borderRadius:12,height:60,flexDirection:'row'}}>

                    <Text style={{marginLeft : 10,marginTop:20,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'90%'}}>

                        {item.document_name}
                    </Text>

                    <Image style = {{width :20 ,height: 20,marginRight:20,marginTop:20,resizeMode: 'contain'}}
                           source={require('./file-download.png')}/>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }

    myCallbackFunctionsso= (res) => {
      
        this.hideLoading()
        if (res.status == 200){

            // alert(JSON.stringify(res))
alert('Sucess')
            //   GLOBAL.requestid = res.request_id
            //  this.props.navigation.navigate('SucessBooking')

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    myCallbackFunctionss1 = (res) => {

        this.hideLoading()
        if (res.status == 200){

            // alert(JSON.stringify(res))

            Linking.openURL(res.data.document)
            //   GLOBAL.requestid = res.request_id
            //  this.props.navigation.navigate('SucessBooking')

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    myCallbackFunctionss = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({data:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctionss0 = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({datass:res.data})

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }


    componentDidMount(){
        this.loadHome()
        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    hi = () => {
        alert('dd')
    }
    _handlePress() {
        this.showLoading()


        var self=this;
        var url = GLOBAL.BASE_URL + 'muster_roll_upload';




        const data = new FormData();
        data.append('user_id', GLOBAL.userID);
        data.append('month', this.state.monthid);
        data.append('booking_id', this.state.orderid);

        // you can append anyone.
        data.append('muster_file', {
            uri: this.state.image,
            type: 'image/jpeg', // or photo.type
            name: 'image.png'
        });


        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

        }).then(function (response) {
          //  alert(JSON.stringify(response))

                self.myCallbackFunctionsso(response)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });





        // this.props.navigation.navigate('Otp')
    }

    _handlePresss1 = () => {
        var dict =
            [{
                id :"",
                no_of_labour :"",
                name:'',
            }]


        var s = this.state.selectedCategory

        const interest = [...s, ...dict];

        this.setState({selectedCategory:interest})

    }
    _handlePresss = () => {
        var dict =
            [{
                id :"",
                no_of_labour :"",
                name:'',
            }]


        var s = this.state.moviesList

        const interest = [...s, ...dict];

        this.setState({moviesList:interest})

    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    _renderItem = ({item,index}) => {


        return (
            <View style = {{width:'100%'}}>





                <View style = {{flexDirection: 'row',backgroundColor:"white",height:50,marginTop:2,width:'100%'}}>

                    <TextInput style = {{width:'37%',backgroundColor:'grey',margin:8,marginLeft:0}}


                               placeholderTextColor= '#D3D3D'




                    />

                    <View style = {{width:'8%',marginTop:8}}>
                        <TextInput style = {{backgroundColor:'grey',height:30}}


                                   placeholderTextColor= '#D3D3D'
                                   keyboardType = "number-pad"



                        />

                    </View>

                    <View style = {{marginLeft :'6%',width:'8%',marginTop:8}}>
                        <TextInput style = {{backgroundColor:'grey',height:30}}


                                   placeholderTextColor= '#D3D3D'
                                   keyboardType = "number-pad"



                        />

                    </View>

                    <View style = {{marginLeft :'6%',width:'8%',marginTop:8}}>
                        <TextInput style = {{backgroundColor:'grey',height:30}}


                                   placeholderTextColor= '#D3D3D'
                                   keyboardType = "number-pad"



                        />

                    </View>


                    <View style = {{marginLeft :'6%',width:'8%',marginTop:8}}>
                        <TextInput style = {{backgroundColor:'grey',height:30}}


                                   placeholderTextColor= '#D3D3D'
                                   keyboardType = "number-pad"



                        />

                    </View>

                    <View style = {{marginLeft:'3%',width:'10%',marginTop:15}}>
                        <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                            1

                        </Text>



                    </View>


                </View>







            </View>

        )
    }

    render() {



        let added_buttons_goes_here = this.state.selectedCategory.map( (data, index) => {
            return (
                <View>
                    <View style = {{width:'100%'}}>

                        <View style = {{marginTop:16}}>

                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-2.2}
                                      onChangeText ={ (value,index) => this.getIndexs(index) }

                                      label={stringsoflanguages.code}
                                      data={this.state.data}
                            />






                        </View>



                        <View style = {{flexDirection: 'row',backgroundColor:"#006FA5",height:50,marginTop:30,width:'100%'}}>

                            <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'30%',margin:8}}>
                                {stringsoflanguages.work}

                            </Text>

                            <View style = {{width:'12%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    L

                                </Text>

                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    (m)

                                </Text>

                            </View>

                            <View style = {{width:'12%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    B

                                </Text>

                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    (m)

                                </Text>

                            </View>


                            <View style = {{width:'12%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    H

                                </Text>

                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    (m)

                                </Text>

                            </View>


                            <View style = {{width:'12%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    Unit

                                </Text>



                            </View>

                            <View style = {{width:'10%',marginTop:8}}>
                                <Text style = {{fontSize : 14,color :'white', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                    Qty

                                </Text>



                            </View>


                        </View>

                    </View>


                    <FlatList style= {{flexGrow:0,marginTop:5}}
                              data={this.state.moviesList}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItem}
                    />


                    <Button
                        style={{marginTop:12,padding:6,fontSize: 16, color: '#77869E',backgroundColor:'white',borderWidth:1,borderColor:'#77869E',width:'30%',height:30,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePresss()}>
                        {stringsoflanguages.add}
                    </Button>


                    <View style = {{flexDirection:'row',width:'100%',height:30,marginTop:'5%'}}>
                        <Text style = {{fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'90%'}}>
                            Deductions

                        </Text>

                        <Text style = {{fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'flex-end',marginRight: 10}}>
                            2

                        </Text>

                    </View>

                    <View style = {{flexDirection: 'row',backgroundColor:"#dedede",height:30,marginTop:30,width:'100%'}}>

                        <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',width:'30%',margin:8}}>
                            Total

                        </Text>

                        <View style = {{width:'18%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                2

                            </Text>



                        </View>

                        <View style = {{width:'18%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                2

                            </Text>



                        </View>


                        <View style = {{width:'18%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                2

                            </Text>



                        </View>

                        <View style = {{width:'10%',marginTop:8}}>
                            <Text style = {{fontSize : 14,color :'black', height:'auto',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                                2

                            </Text>



                        </View>


                    </View>
                </View>
            )
        });





        var radio_props_one = [
            {label: 'Yes', value: 1 },
            {label: 'No', value: 2 },

        ];

        let datas= [];
        let { name } = this.state;

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
                    <KeyboardAwareScrollView>

                        <View style = {{flexDirection:  'row',marginTop:20}}>

                            <TouchableOpacity onPress={() => this.props.navigation.goBack()
                            }>

                                <Image style = {{width :30 ,height: 30,marginLeft:20,marginTop:-2,resizeMode: 'contain'}}
                                       source={require('./back.png')}/>

                            </TouchableOpacity>


                            <Text style = {{marginLeft: 12,width:300,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',marginTop:2}}>
                                {stringsoflanguages.wage}

                            </Text>



                        </View>

                        <Text style = {{textAlign:'center',width:window.width,color:'#77869E',fontSize: 16,fontFamily:'AvenirLTStd-Medium',marginTop:22}}>
                            {stringsoflanguages.uploadsig}

                        </Text>
                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'3%'}}>




                            <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                      fontSize={14}
                                      labelFontSize={13}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }

                                      label={stringsoflanguages.jobid}
                                      data={this.state.datas}

                            />



                            <View style = {{marginTop:16}}>

                                <Dropdown containerStyle={{width:'100%', height:50, marginTop:-10}}
                                          fontSize={14}
                                          labelFontSize={13}
                                          dropdownPosition = {-2.2}
                                          onChangeText ={ (value,index) => this.getIndexs(index) }

                                          label={stringsoflanguages.selectm}
                                          data={this.state.data}
                                />
                            </View>


                            <TouchableOpacity onPress={() => this.idProff()
                            }>

                                <View>
                                    {this.state.avatarSource == '' && (

                                        <Image style = {{alignSelf:'center',width :200 ,height: 150,marginTop:'10%',resizeMode: 'contain'}}
                                               source={require('./uploads.png')}/>

                                    )}
                                    {this.state.avatarSource != '' && (

                                        <Image style = {{alignSelf:'center',width :200 ,height: 150,marginTop:'10%'}}
                                               source={{ uri: this.state.image}}/>

                                    )}
                                </View>
                            </TouchableOpacity>

                            <Button
                                style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePress()}>
                                {stringsoflanguages.submit}
                            </Button>






                        </View>




                    </KeyboardAwareScrollView>

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
        height:'100%'
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