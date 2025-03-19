
import React from "react";
import Layout from "@/components/layout/Layout";
import BlogHero from "@/components/blog/BlogHero";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { 
    blogPosts, 
    allTags, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedTag, 
    setSelectedTag, 
    filteredPosts 
  } = useBlogPosts();

  return (
    <Layout>
      <BlogHero />
      
      <BlogSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
      />
      
      <BlogGrid 
        filteredPosts={filteredPosts}
        loading={loading}
      />
      
      <BlogNewsletter />
    </Layout>
  );
};

export default Blog;
