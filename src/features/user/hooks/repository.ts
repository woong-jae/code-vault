import { useState } from 'react';
import { validateRepositoryName } from '..';

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
