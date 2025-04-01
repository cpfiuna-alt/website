
import React from "react";
import Layout from "@/components/layout/Layout";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSearch from "@/components/blog/BlogSearch";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogNewsletter from "@/components/blog/BlogNewsletter";

const Blog: React.FC = () => {
  const { 
    filteredPosts, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedTag, 
    setSelectedTag, 
    allTags 
  } = useBlogPosts();

  return (
    <Layout>
      <BlogHero />
      
      <div className="bg-black py-12">
        <BlogSearch 
          onSearch={setSearchTerm} 
          tags={allTags} 
          onTagSelect={setSelectedTag}
          selectedTag={selectedTag || ""}
        />
        
        <div className="py-12">
          <BlogGrid posts={filteredPosts} loading={loading} />
        </div>
        
        <BlogNewsletter />
      </div>
    </Layout>
  );
};

export default Blog;
