import clubResourcesData from '@/data/clubResources.json';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  downloadUrl: string;
  fileSize: string;
  format: string;
  tags: string[];
}

export interface ResourcesMetadata {
  lastUpdated: string;
  version: string;
  totalResources: number;
}

export interface ClubResourcesData {
  resources: Resource[];
  metadata: ResourcesMetadata;
}

class ClubResourcesService {
  private data: ClubResourcesData;

  constructor() {
    this.data = clubResourcesData as ClubResourcesData;
  }

  /**
   * Get all resources
   */
  getAllResources(): Resource[] {
    return this.data.resources;
  }

  /**
   * Get resource by ID
   */
  getResourceById(id: string): Resource | undefined {
    return this.data.resources.find(resource => resource.id === id);
  }

  /**
   * Get resources by type
   */
  getResourcesByType(type: string): Resource[] {
    return this.data.resources.filter(resource => resource.type === type);
  }

  /**
   * Get resources by tag
   */
  getResourcesByTag(tag: string): Resource[] {
    return this.data.resources.filter(resource => 
      resource.tags.some(resourceTag => 
        resourceTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  /**
   * Search resources by title or description
   */
  searchResources(query: string): Resource[] {
    const searchTerm = query.toLowerCase();
    return this.data.resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.author.toLowerCase().includes(searchTerm) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * Filter resources by multiple criteria
   */
  filterResources(filters: {
    searchTerm?: string;
    type?: string;
    tags?: string[];
    author?: string;
  }): Resource[] {
    let filteredResources = this.data.resources;

    if (filters.searchTerm) {
      filteredResources = this.searchResources(filters.searchTerm);
    }

    if (filters.type) {
      filteredResources = filteredResources.filter(resource => 
        resource.type === filters.type
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredResources = filteredResources.filter(resource =>
        filters.tags!.some(tag => resource.tags.includes(tag))
      );
    }

    if (filters.author) {
      filteredResources = filteredResources.filter(resource =>
        resource.author.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }

    return filteredResources;
  }

  /**
   * Get all unique resource types
   */
  getResourceTypes(): string[] {
    return Array.from(new Set(this.data.resources.map(resource => resource.type)));
  }

  /**
   * Get all unique tags
   */
  getAllTags(): string[] {
    return Array.from(
      new Set(this.data.resources.flatMap(resource => resource.tags))
    );
  }

  /**
   * Get all unique authors
   */
  getAuthors(): string[] {
    return Array.from(new Set(this.data.resources.map(resource => resource.author)));
  }

  /**
   * Get metadata about the resources
   */
  getMetadata(): ResourcesMetadata {
    return this.data.metadata;
  }

  /**
   * Get resources sorted by date (newest first)
   */
  getResourcesSortedByDate(): Resource[] {
    return [...this.data.resources].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  /**
   * Validate download URL (check if it's a valid external URL)
   */
  isValidDownloadUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * Get safe download URL (opens in new tab and validates URL)
   */
  getSafeDownloadUrl(resource: Resource): { url: string; isExternal: boolean; isValid: boolean } {
    const isValid = this.isValidDownloadUrl(resource.downloadUrl);
    const isExternal = isValid && !resource.downloadUrl.includes(window.location.hostname);
    
    return {
      url: resource.downloadUrl,
      isExternal,
      isValid
    };
  }
}

// Export singleton instance
export const clubResourcesService = new ClubResourcesService();
export default clubResourcesService;
