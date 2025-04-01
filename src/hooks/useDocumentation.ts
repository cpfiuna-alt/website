
import { useState, useEffect, useMemo } from 'react';
import { DocFrontMatter } from '@/utils/markdown/types';
import { DocItem } from '@/utils/contentTypes';
import { getAllContent, getContentBySlug } from '@/utils/contentLoader';

export function useAllDocs() {
  const [docs, setDocs] = useState<Array<{
    frontMatter: DocFrontMatter;
    content: string;
    slug: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const fetchedDocs = await getAllContent<DocFrontMatter>('docs');
        setDocs(fetchedDocs);
      } catch (error) {
        console.error('Error fetching docs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  // Filter docs based on search query and category
  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const matchesSearch = searchQuery 
        ? doc.frontMatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.frontMatter.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = selectedCategory
        ? doc.frontMatter.category === selectedCategory
        : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [docs, searchQuery, selectedCategory]);

  // Group docs by category
  const docsByCategory = useMemo(() => {
    const grouped: Record<string, Array<{
      title: string;
      slug: string;
      description: string;
    }>> = {};

    filteredDocs.forEach(doc => {
      const category = doc.frontMatter.category || 'Uncategorized';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      
      grouped[category].push({
        title: doc.frontMatter.title,
        slug: doc.slug,
        description: doc.frontMatter.description
      });
    });

    // Sort by order if available
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => {
        const docA = docs.find(d => d.slug === a.slug);
        const docB = docs.find(d => d.slug === b.slug);
        
        if (docA?.frontMatter.order !== undefined && docB?.frontMatter.order !== undefined) {
          return docA.frontMatter.order - docB.frontMatter.order;
        }
        
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  }, [filteredDocs, docs]);

  return {
    docs: filteredDocs,
    docsByCategory,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };
}

export function useDocBySlug(slug: string | undefined) {
  const [doc, setDoc] = useState<DocItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!slug) {
        setDoc(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedDoc = await getContentBySlug<DocFrontMatter>('docs', slug);
        setDoc(fetchedDoc as DocItem);
      } catch (err) {
        console.error(`Error fetching doc with slug "${slug}":`, err);
        setError(err instanceof Error ? err : new Error('Failed to fetch document'));
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [slug]);

  return { doc, loading, error };
}
