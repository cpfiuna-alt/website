
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocsHomePage from './docs/HomePage';
import DocPage from './docs/DocPage';

const Documentation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DocsHomePage />} />
      <Route path="/:slug" element={<DocPage />} />
    </Routes>
  );
};

export default Documentation;
