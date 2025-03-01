import React, { createContext, useState, useContext } from 'react';

const UserPreferencesContext = createContext();

export const useUserPreferences = () => useContext(UserPreferencesContext);

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({});

  const updatePreference = (tag) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      [tag]: !prevPreferences[tag],
    }));
  };

  const setInitialPreferences = (tags) => {
    const initialPrefs = tags.reduce((pref, tag) => {
        pref[tag] = true
        return pref
    }, {});
    setPreferences(initialPrefs)
  }

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreference, setInitialPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};