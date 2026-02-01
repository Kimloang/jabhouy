import { Product, PaginatedResponse } from './types.ts';
import { PRODUCTS } from './constants.ts';

export const apiDynamic = {
  getProducts: async (params: {
    page?: number;
    limit?: number;
    category?: string | null;
    query?: string;
  }): Promise<PaginatedResponse<Product>> => {
    const { page = 1, limit = 4, category, query } = params;
    
    const url = new URL('http://localhost:9090/api/products');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    
    if (category) {
      url.searchParams.append('category', category);
    }
    
    if (query) {
      url.searchParams.append('query', query);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }
};

export const api = {
    getProducts: async (params: {
        page?: number;
        limit?: number;
        category?: string | null;
        query?: string;
    }): Promise<PaginatedResponse<Product>> => {
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 800));

        const { page = 1, limit = 4, category = null, query = '' } = params;

        let filtered = [...PRODUCTS];

        if (category) {
            filtered = filtered.filter(p => p.category === category);
        }

        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedItems = filtered.slice(startIndex, endIndex);
        const hasMore = endIndex < filtered.length;

        return {
            data: paginatedItems,
            total: filtered.length,
            page,
            limit,
            hasMore
        };
    }
};