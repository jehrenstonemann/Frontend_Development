import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useUserPreferences } from '../UserPreferencesContext';
import BadgerNewsTagCard from '../BadgerNewsTagCard';

function BadgerPreferencesScreen(props) {
  const [tags, setTags] = useState([]);
  const { preferences, updatePreference, setInitialPreferences } = useUserPreferences();

  useEffect(() => {
    fetch('https://cs571.org/api/s24/hw8/articles', {
      headers: {
        'X-CS571-ID': 'bid_cb96aea08052bb15a19b727edcd9831e8d4fe403dfa95dae25e85b17c2a13b1a',
      },
    })
      .then(res => res.json())
      .then(data => {
        const allTags = data.reduce((acc, curr) => {
          curr.tags.forEach(tag => {
            if (!acc.includes(tag)) {
              acc.push(tag);
            }
          });
          return acc;
        }, []);
        setTags(allTags);
        setInitialPreferences(allTags); 
      });
  }, []);

  return (
    <ScrollView>
      {tags.map(tag => (
        <BadgerNewsTagCard key={tag} tag={tag} 
        enabled={preferences[tag]} onToggle={(tag, isEnabled) => updatePreference(tag, isEnabled)} />
      ))}
    </ScrollView>
  );
}

export default BadgerPreferencesScreen;