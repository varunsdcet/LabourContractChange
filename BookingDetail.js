import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stringsoflanguages from './Local';
import { Marker } from 'react-native-maps';
import axios from 'react-native-axios';
const GLOBAL = require('./Global');
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';

var moment = require('moment');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Dialog, {DialogContent} from "react-native-popup-dialog";
import MaterialTabs from 'react-native-material-tabs';
import MapView from "react-native-map-clustering";
var type = 0;
var count:'';
var tomorrow;
export default class BookingDetail extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        selectedTab:0,
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
        if (type == 0){
            this.setState({mystart:date})
            this.setState({ startDate: date.toString() });
        }else{
            this.setState({ endDate: date.toString() });
        }

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

    getIndex = (index) => {

        GLOBAL.categoryid = this.state.data[index].id
        this.props.navigation.push('NewCate')
    }
    loadHome()
    {

        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'close_job';
        axios.post(url, {
            order_id: GLOBAL.bookingArray.order_id,
            user_id: GLOBAL.userID


        })
            .then(function (response) {

                self.myCallbackFunctions(response.data)

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



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }

    _handlePresss =()=> {
        this.setState({visible:false})
        this.setState({done:true})



    }


    showLoading() {
        this.setState({loading: true})
    }




    myCallbackFunctionss = (res) => {


        this.hideLoading()
        if (res.status == 200){
          this.props.navigation.goBack()

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    myCallbackFunctions = (res) => {
        alert(JSON.stringify(res))
       


        this.hideLoading()
        if (res.status == 200){
            this.props.navigation.goBack()

        }
        else{
            alert(stringsoflanguages.unable)
        }

    }

    componentDidMount(){
      //  this.loadHome(0)

      alert(JSON.stringify(GLOBAL.bookingArray))


        var no = GLOBAL.bookingArray.no_labour

        if (no == ''){

        }else{
            var res = no.split(",")
            if (res.length == 1){
                count = res[0]
            }else{
                count = parseInt(res[0]) + parseInt(res[1])
            }
        }
        //  tomorrow = new Date();
        //  tomorrow = moment(tomorrow).add(1, 'day').format('yyyy-MM-dd\'T\'HH:mm:ss.SSSz')
        // const myDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss").toDate();
        //  alert(myDate)
        //   this.setState({date:myDate})
    }
    _handlePress(status) {






            var self=this;
            var url = GLOBAL.BASE_URL + 'accept_job';
            axios.post(url, {
                user_id: GLOBAL.userID,
                order_id:GLOBAL.bookingArray.order_id,
                status :status,








            })
                .then(function (response) {

                    self.myCallbackFunctionss(response.data)

                })
                .catch(function (error) {
                    alert(error)
                    //  self.myCallbackFunction()

                });





        // this.props.navigation.navigate('Otp')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    categorySelect = (index) =>{
        this.setState({selectedTab:index})
        this.loadHome(index)

    }

    _handlePressd = (index) => {
        GLOBAL.assigntype = index
       this.props.navigation.navigate('AssignLabour')
    }
    _renderItems = ({item,index}) => {



        let cate = item.category.split(',')
        let no = item.no_labour.split(',')
        let nos = '';

        for (let i = 0;i <cate.length;i++){

            let acronym = cate[i].split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
            alert(acronym)

            let acronyms = no[i].split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
            nos = nos +  acronym  + ":" +  acronyms + ' , '
        }





        return (



            <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>
                <Text style = {{fontSize : 18,color :'#042C5C', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom:3}}>
                    {index + 1}  #  {item.contractor_id} : {item.name}

                </Text>

                <Text style = {{fontSize : 18,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4,marginBottom:3}}>
                   {nos}

                </Text>



            </View>



        )
    }
    cancel (){
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'cancelorder';
        axios.post(url, {
            id: GLOBAL.bookingArray.id,


        })
            .then(function (response) {

                self.myCallbackFunctionss(response.data)

            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });
    }
    render() {
        let added_buttons_goes_here ;
        var cate = GLOBAL.bookingArray.category.split(",")
        var cats  = GLOBAL.bookingArray.no_labour.split(",")
        if (cate == "") {

        } else {

         added_buttons_goes_here = cate.map((data, index) => {
            return (
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop:12,
                    marginBottom:12,
                }}>
                    <Text style = {{alignSelf: 'center',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:15}}>
                        {data}

                    </Text>

                    <Text style = {{alignSelf: 'flex-end',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:15}}>
                        {cats[index]}

                    </Text>

                </View>
            )
        });
    }


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

                    <View style = {{backgroundColor:'#F6F8F9'}}>


                    <View style = {{flexDirection:  'row',marginTop:0,width:'100%',backgroundColor:'white'}}>

                        <View style = {{width:'90%',flexDirection:'row',marginTop:12}}>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()
                        }>




                            <Image style = {{width :30 ,height: 30,marginLeft:20,resizeMode: 'contain'}}
                                   source={require('./back.png')}/>

                        </TouchableOpacity>


                        <Text style = {{marginLeft: 12,width:200,color:'#042C5C',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',marginTop:5}}>
                           # {GLOBAL.bookingArray.request_id}

                        </Text>

                        </View>
                        <TouchableOpacity onPress={() => this.loadHome()
                        }>

                            {GLOBAL.myo == 1 && (

                        <Image style = {{width :20 ,height: 20,resizeMode: 'contain',marginTop:18}}
                               source={require('./dots-vertical.png')}/>
                            ) }

                        </TouchableOpacity>

                    </View>


                    <View style = {{margin:10,borderRadius:16,backgroundColor:'white'}}>

                        <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:52,margin:10}}>

                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                                <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                    {stringsoflanguages.date} : {GLOBAL.bookingArray.request_date}

                                </Text>

                                <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                    {stringsoflanguages.time} : {GLOBAL.bookingArray.request_time}

                                </Text>

                            </View>
                            <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>



                                <Text style = {{alignSelf: 'center',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                    {stringsoflanguages.requestno} : {GLOBAL.bookingArray.request_id}

                                </Text>

                                <Text style = {{alignSelf: 'flex-end',fontSize : 12,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginRight:4}}>
                                    {stringsoflanguages.bid} : {GLOBAL.bookingArray.booking_id}

                                </Text>

                            </View>

                        </View>

                        <View style = {{flexDirection:'row',marginLeft:14,marginTop:3}}>
                            <Image style = {{width :13 ,height: 13,marginLeft:4,resizeMode: 'contain'}}
                                   source={require('./worker.png')}/>

                            <Text style = {{alignSelf: 'center',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                {GLOBAL.bookingArray.total_labour} Labour Required

                            </Text>

                        </View>


                        <View style = {{flexDirection:'row',marginLeft:14,marginTop:12}}>
                            <Image style = {{width :13 ,height: 13,marginLeft:4,resizeMode: 'contain'}}
                                   source={require('./tag.png')}/>

                            <Text style = {{alignSelf: 'center',fontSize : 14,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:4}}>
                                {GLOBAL.bookingArray.address}

                            </Text>

                        </View>



                    </View>



                    <View style = {{margin:10,marginTop:8,borderRadius:16,backgroundColor:'white'}}>

                        <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:40,margin:10}}>

                            <Text style = {{color:"#042C5C",fontSize : 18, height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:'5%',marginTop:12}}>
                                {stringsoflanguages.labourDetail}
                            </Text>

                        </View>


                        <View style = {{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                            <Text style = {{marginLeft: '5%',width:'60%',color:'#042C5C',fontSize: 16,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                                {stringsoflanguages.labourCategory}

                            </Text>

                            <Text style = {{marginRight: '5%',width:'40%',color:'#042C5C',fontSize: 16,marginTop: '4%',fontFamily:'AvenirLTStd-Heavy'}}>
                                {stringsoflanguages.nooflabour}

                            </Text>

                        </View>

                        {added_buttons_goes_here}

                    </View>




                        <View style = {{backgroundColor:'white',margin:12,borderRadius:16}}>
                            <View style = {{backgroundColor:"#f7fbfc",borderRadius:4,height:40,margin:10}}>

                                <Text style = {{color:"#042C5C",fontSize : 18, height:'auto',fontFamily:'AvenirLTStd-Medium',marginLeft:'5%',marginTop:12}}>
                                    {stringsoflanguages.locationMap}
                                </Text>

                            </View>
                            <MapView
                                region={{
                                    latitude: 52.5,
                                    longitude: 19.2,
                                    latitudeDelta: 8.5,
                                    longitudeDelta: 8.5
                                }}
                                style={{ width: window.width - 20, height: 200 }}
                            >
                                <Marker coordinate={{ latitude: 52.0, longitude: 18.2 }} />

                            </MapView>


                        </View>

                        {GLOBAL.myo != 1 && (
                            <View>

                        <Button
                            style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress(1)}>
                            {stringsoflanguages.accept}
                        </Button>


                        <Button
                            style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress(2)}>
                            {stringsoflanguages.decline}
                        </Button>
                            </View>
                            )}

                        {GLOBAL.myo == 1 && (
                            <View>

                                <Button
                                    style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                    styleDisabled={{color: 'red'}}
                                    onPress={() => this._handlePressd(1)}>
                                    {stringsoflanguages.assignl}
                                </Button>


                                <Button
                                    style={{padding:10,marginTop:20,fontSize: 20, color: 'white',backgroundColor:'#006FA5',marginLeft:'5%',width:'90%',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                                    styleDisabled={{color: 'red'}}
                                    onPress={() => this._handlePressd(2)}>
                                    {stringsoflanguages.assigns}
                                </Button>
                            </View>
                        )}


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

        backgroundColor :'white',
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