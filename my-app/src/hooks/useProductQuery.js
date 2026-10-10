import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, reduceStock } from '../services/productService';

const QUERY_KEY = ['products'];

export const useProducts = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      // simulate network delay for more realistic experience
      await new Promise(resolve => setTimeout(resolve, 500));
      return getProducts();
    },
  });
};

export const useReduceStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartItems) => {
      return reduceStock(cartItems);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
