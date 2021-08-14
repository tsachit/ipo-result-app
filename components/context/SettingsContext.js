import React, { createContext, useState } from 'react';
import get from 'lodash/get';

export const SettingsContext = createContext();

const defaultSettings = {
  users: [
    {boid: 34234234, name: 'Sachit'},
    {boid: 234234, name: 'Karki'}
  ]
};

// This context provider is passed to any component requiring the context
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const setSettingsCustom = (settingsObj) => {
    if (settingsObj) {
      // use old values if not everything is provided in settingsObj
      setSettings((oldSettingsObj) => ({ ...oldSettingsObj, ...settingsObj }));
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings: setSettingsCustom}}>
      {children}
    </SettingsContext.Provider>
  );
};
