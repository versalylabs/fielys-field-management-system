/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FielysProvider } from './context/FielysContext';
import { AppShell } from './components/layout/AppShell';

export default function App() {
  return (
    <FielysProvider>
      <AppShell />
    </FielysProvider>
  );
}
