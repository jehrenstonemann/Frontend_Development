import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BadgerNewsItemCard from '../BadgerNewsItemCard';
import { useUserPreferences } from '../UserPreferencesContext';

function BadgerNewsScreen(props) {
  const [newsItems, setNewsItems] = useState([]);
  const navigation = useNavigation();
  const { preferences } = useUserPreferences();

  useEffect(() => {
    fetch('https://cs571.org/api/s24/hw8/articles', {
      headers: {
        'X-CS571-ID': 'bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a',
      },
    })
      .then(res => res.json())
      .then(data =>{
        setNewsItems(data);
    })
  }, []);

  const visit = news => {
    navigation.push('Article', {
      fullID: news.fullArticleId,
      img: news.img,
      title: news.title,
    });
  };

  const filteredArticles = newsItems.filter(news => 
    news.tags.every(tag => preferences[tag] !== false)
  );

  return (
    <ScrollView>
        {
            filteredArticles.length > 0 ? (
                filteredArticles.map(news => (
                    <BadgerNewsItemCard key={news.id} onPress={() => visit(news)} {...news} />
                ))
            ) : (
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize:24, textAlign:'center'}}>There are no articles that fit your preferences!</Text>
                </View>   
            )
        }
    </ScrollView>
  );
}

export default BadgerNewsScreen;