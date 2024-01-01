import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from '@base/components/Toaster';
import {
  createRepository,
  getSelectedRepository,
  retrieveRepositories,
  setSelectedRepository,
  validateRepositoryName,
} from '../repository';

export function useRepositoryName() {
  const [repositoryName, setRepositoryName] = useState('');
  const [isValid, setIsValid] = useState(false);

  return {
    repositoryName,
    setRepositoryName: (newValue: string) => {
      setIsValid(validateRepositoryName(newValue));
      setRepositoryName(newValue);
    },
    isValid,
  };
}

export function useSelectRepository({
  accessToken,
}: {
  accessToken: AccessToken;
}) {
  const queryClient = useQueryClient();
  const { data: repositories, isLoading: isLoadingRepositories } = useQuery({
    queryKey: [accessToken, 'repositories'],
    queryFn: () => retrieveRepositories(accessToken),
  });
  const { data: selectedRepository, isLoading: isLoadingSelectedRepository } =
    useQuery({
      queryKey: [accessToken, 'selectedRepository'],
      queryFn: () => getSelectedRepository(accessToken),
    });

  const { toast } = useToast();

  async function selectRepository(repositoryName: string) {
    await setSelectedRepository(repositoryName);
    queryClient.refetchQueries({
      queryKey: [accessToken, 'selectedRepository'],
      type: 'active',
    });

    toast({
      title: `'${repositoryName}'가 선택됐습니다.`,
      description: `'${repositoryName}' 저장소에 풀이가 저장됩니다.`,
    });
  }

  const isLoaded = !isLoadingRepositories && !isLoadingSelectedRepository;

  return {
    repositories,
    selectedRepository,
    selectRepository,
    isLoaded,
  };
}

export function useCreateRepository({
  accessToken,
  onSettled,
}: {
  accessToken: AccessToken;
  onSettled?: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (repositoryName: string) => {
      return createRepository({
        accessToken,
        repositoryName,
      });
    },
    onSettled: (isSuccess) => {
      onSettled?.();

      if (!isSuccess) {
        toast({
          title: '저장소 생성에 실패했습니다.',
          description: '이미 존재하는 저장소 이름인지 확인해보세요.',
        });
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [accessToken, 'repositories'],
        type: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: [accessToken, 'selectedRepository'],
        type: 'active',
      });

      toast({
        title: '저장소 생성에 성공했습니다.',
        description: '생성된 저장소에 풀이가 저장됩니다.',
      });
    },
  });

  return mutation;
}
