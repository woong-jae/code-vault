import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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

  async function selectRepository(repositoryName: string) {
    await setSelectedRepository(repositoryName);
    queryClient.refetchQueries({
      queryKey: [accessToken, 'selectedRepository'],
      type: 'active',
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
  onSettled?: (isSuccess: boolean) => void;
}) {
  const mutation = useMutation({
    mutationFn: (repositoryName: string) => {
      return createRepository({
        accessToken,
        repositoryName,
      });
    },
    onSettled: (isSuccess) => {
      onSettled?.(isSuccess || false);
    },
  });

  return mutation;
}
