import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

const defaultSettings = {
  users: [],
  companies: []
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
