import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, WishlistItem } from '../types/product';

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getTotalWishlistItems: () => number;
  moveAllToCart: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (!existingItem) {
          set({ items: [...currentItems, product] });
        }
      },
      
      removeFromWishlist: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        });
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId);
      },
      
      getTotalWishlistItems: () => {
        return get().items.length;
      },
      
      moveAllToCart: () => {
        // This function will be implemented to move all wishlist items to cart
        // It requires access to the cart store, which will be handled in the component
        // that uses this function
      }
    }),
    {
      name: 'wishlist-storage', // name of the item in localStorage
    }
  )
);
