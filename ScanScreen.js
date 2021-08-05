import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { normalize } from 'yargs';

export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state ={
            hascameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            haveCameraPermissions:status==='granted',
            buttonState:id,
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState==="clicked"){
        this.setState({
            scanned:true,
            scannedBookId:data,
            buttonState:'normal'
        })
    }

}
render(){
    const haveCameraPermissions=this.state.haveCameraPermissions
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState
    if(buttonState!=="normal"&& haveCameraPermissions){
        return(
        <BarCodeScanner 
        onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        )
    }
    else if(buttonState==="normal"){

    
    return(
        <View>
            <TouchableOpacity
        onPress={this.getCameraPermissions}
        style={StyleSheet.scanButton}
        title="BarCodeScanner">
                    <Text style={styles.buttonText}> Scan QR Code </Text>

            </TouchableOpacity>
        </View>
        
    )
    }
}
}

