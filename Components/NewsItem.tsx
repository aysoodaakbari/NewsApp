import { StyleSheet, Image, View, Text,  TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';


export type NewsItemProps = {
    newsData: {
        author?: string;
        url: string;
        description: string;
        title: string;
        urlToImage: string;
        publishedAt: string;
        source: {
            name: string;
        }
    }
}

const NewsItem = (props: NewsItemProps) => {
  
   // const navigation = useNavigation();

    const goToArticle = () => {
        // got to article source
       WebBrowser.openBrowserAsync(props.newsData.url);
        
    }

  return (
    <TouchableOpacity
        style={[styles.container,{
            backgroundColor: '#fff'
        }]} 
        onPress={goToArticle}
    >
        {/* article image url */}
        <Image
            source={{
                uri: props.newsData.urlToImage
            }}
            style={styles.image}
            resizeMode= "cover"
        />
        <Text>{props.newsData.title}</Text>

    </TouchableOpacity>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        alignSelf: "center",
        marginTop: 28,
        borderRadius: 30,
        shadowOpacity: 0.5,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5
        }
    },
    image:{
        width: "100%",
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
   
})