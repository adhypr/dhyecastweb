import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, createOrder } from '../services/orderService';

const QUERY_KEY = ['orders'];

export const useOrders = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return getOrders();
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return createOrder(orderData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
