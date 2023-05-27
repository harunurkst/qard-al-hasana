import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import { FetchedMemberSavingsType } from '../types/memberSaving.type';
import http from '@/utils/http';

const getMemberSavingsAsync = async (pageNumber: number) => {
    console.log('pageNumber',pageNumber)
    const response = await http.get(`/api/v1/transaction/member-savings-list`);
    return response.data;
};

export const useFetchMemberSavings = (pageNumber: number) => {
  const setSavings = useMemberSavingsStore((state) => state.actions.setSavings);
  
  const queryClient = new QueryClient();

  const { data: allMembers } = useQuery<FetchedMemberSavingsType>({
        queryKey: ['memberSavings', pageNumber],
        queryFn: () => getMemberSavingsAsync(pageNumber),
        onSuccess: (data: FetchedMemberSavingsType) => {
            // set data in the Zustand store on successful fetch
            setSavings(data.results);
        },
        onSettled: () => {
            // Once the data is fetched, save the queries to the cache
            queryClient.setQueryData(['memberSavings', pageNumber], dehydrate(queryClient));
        }
    });

  return { allMembers };
};
