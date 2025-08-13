
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProjectsDocsHub from '@/components/docs/ProjectsDocsHub';
import ProjectDocumentationPage from '@/components/docs/ProjectDocumentationPage';

const Documentation: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Main documentation hub */}
        <Route path="/" element={<ProjectsDocsHub />} />
        
        {/* Project documentation routes */}
        <Route path="/projects/:projectId" element={<ProjectDocumentationPage />} />
        <Route path="/projects/:projectId/:chapterId" element={<ProjectDocumentationPage />} />
        <Route path="/projects/:projectId/:chapterId/:sectionId" element={<ProjectDocumentationPage />} />
      </Routes>
    </Layout>
  );
};

export default Documentation;
