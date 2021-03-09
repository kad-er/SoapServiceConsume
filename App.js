import axios from 'axios';
import React, { useState }from 'react';
import {parseString} from 'xml2js';
import { StyleSheet, View, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import logo from './assets/logo.png'; 



          
export default function App() {
const [retour, setretour] = useState("kader");
  
let xmls='<?xml version="1.0" encoding="UTF-8"?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">\
<SOAP-ENV:Header/>\
<S:Body>\
    <ns2:hotellist xmlns:ns2="http://hotel.me.org/"/>\
</S:Body>\
</S:Envelope>';
const [data, setData] = useState("loading data");
axios.post('http://192.168.1.8:8080/hotelservice/hotelservice?wsdl',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{
            setData(res);
           }).catch(err=>{console.log(err)});
             
           const xml= data.data
        
           var datajson=""
           
           
           parseString(xml, function (err, result) {
           datajson=result 
          });
          //le ficher json de tout les données c'est datajson , donc tu pourra  essayer d'abord l'affichage avec console.log(datajson) pour verifier que tu as tout configuré 
          // puis il te restera juste a afficher ces données  g la vue , genre une boucle anda tu va traiter toute ces données.
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://scontent-mrs2-1.xx.fbcdn.net/v/t31.0-1/c33.0.200.200a/p200x200/1940006_454427031356024_1697646767_o.jpg?_nc_cat=105&ccb=3&_nc_sid=7206a8&_nc_eui2=AeGiadxaMfoAX0H8WpaYtgSdq9xs3aSWxwSr3GzdpJbHBOgr3YMs_r5KZr0U97H68SgGR-9BkLY2pVRh_v9R1LJp&_nc_ohc=M2sUWf4wpAsAX9k0s37&_nc_ht=scontent-mrs2-1.xx&tp=27&oh=76c9ac6f641c85a8ef69df991817ddf6&oe=60694F0B" }} style={styles.logo} />

      <Text style={styles.welcome_message}>kader</Text>
      
      <TouchableOpacity
        onPress={() => alert('why are you clicking on me!')}
        style={styles.button}>
        <Text style={{ fontSize: 20, color: '#fff' }}>Click here</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    
);
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome_message: {
    marginTop:25,
    color: '#888', 
    fontSize: 18, 
    fontWeight: 'bold',
    paddingHorizontal:45,
    textAlign:'center'
  },
  logo: {
    width:200,
    height:200,
    marginBottom:20,
  },
  button: {
    backgroundColor: 'steelblue',
    borderRadius:5,
    marginVertical:15,
    paddingHorizontal:25,
    paddingVertical:10,
  },
});
