import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet,Image, Platform ,Text, View} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import NewsItem from '../components/NewsItem';



export default function HomeScreen() {

  const [news,setnews] = useState([]);
  const [refreshing,setRefreshing] = useState(false);

  

// getting news
  const getNews = async () => {
    
    await axios.get('https://newsapi.org/v2/top-headlines?category=technology&apiKey=59ea6d32ff3f49e0b1daa24ef26c499d')
    .then((response) => {
      // console.log(response.data.articles);
      setnews(response.data.articles);
 
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
  
    });  
  }


  const onRefresh = () => {
    getNews();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }


  useEffect(() => {
    getNews();
  
  }, []);
  
   
  return (
    <SafeAreaView 
      style={[styles.container,{
        backgroundColor: '#fff'
      }]}>

<FlatList
        data={news}
        renderItem={({item}) => <NewsItem newsData={item}/>}
      
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            <FontAwesome name="newspaper-o" size={24} color={'#f55684'} />
            <Text 
              style={[styles.heading,{
              color: '#f55684'
              }]}
            >
              Tech News
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{height: 20}}/>}
    
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#f55684'}
          />
        }
        />
        
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerComponent:{
    padding: 10,
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 45 : 0,

  },
  heading:{
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15
  }
});