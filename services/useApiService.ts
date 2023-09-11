import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

export interface GetModelsRequestProps {
  key: string;
}

const useApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getModels = (params: GetModelsRequestProps, signal?: AbortSignal) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 'gpt-3.5-turbo',
            name: 'GPT-3.5',
          },
        ]);
      }, 1000);
    });
  };
  // const getModels = useCallback(
  //   (params: GetModelsRequestProps, signal?: AbortSignal) => {
  //     return fetchService.post<{ id: string; name: string }[]>(`/api/models`, {
  //       body: { key: params.key },
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       signal,
  //     });
  //   },
  //   [fetchService],
  // );

  return {
    getModels,
  };
};

export default useApiService;
