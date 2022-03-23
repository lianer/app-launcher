import React from 'react';
import { settings } from '../state/Settings';

export const SettingsContext = React.createContext<typeof settings>(settings);
