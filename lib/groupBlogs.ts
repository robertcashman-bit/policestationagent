/**
 * BLOG GROUPING UTILITY
 * 
 * Groups blog posts by category and sorts them alphabetically.
 * This utility is used by the Header dropdown component.
 */

import { blogPosts, categoryOrder } from '@/data/blogIndex';

export interface GroupedBlogPosts {
  [category: string]: Array<{
    title: string;
    slug: string;
    category: string;
  }>;
}

/**
 * Groups blog posts by category and sorts them alphabetically within each category.
 * 
 * @returns Object keyed by category name, with arrays of sorted posts
 */
export function groupBlogsByCategory(): GroupedBlogPosts {
  // Initialize grouped object with all categories
  const grouped: GroupedBlogPosts = {};
  
  // Initialize all categories (ensures empty categories still appear)
  categoryOrder.forEach(category => {
    grouped[category] = [];
  });
  
  // Group posts by category
  blogPosts.forEach(post => {
    const category = post.category || 'Updates & Commentary';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(post);
  });
  
  // Sort posts alphabetically within each category
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => {
      return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
    });
  });
  
  return grouped;
}

/**
 * Get categories in display order (excluding empty categories).
 * 
 * @returns Array of category names that have posts
 */
export function getCategoriesWithPosts(): string[] {
  const grouped = groupBlogsByCategory();
  return categoryOrder.filter(category => 
    grouped[category] && grouped[category].length > 0
  );
}

/**
 * Get total number of blog posts.
 */
export function getTotalBlogCount(): number {
  return blogPosts.length;
}
