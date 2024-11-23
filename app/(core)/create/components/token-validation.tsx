import { useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { erc20Abi, isAddress } from 'viem';

interface TokenValidationProps {
  tokenAddress: string;
  onValidationChange: (isValid: boolean) => void;
}

export function TokenValidation({
  tokenAddress,
  onValidationChange,
}: TokenValidationProps) {
  const { data: tokenName, isError: isTokenNameError } = useReadContract({
    abi: erc20Abi,
    address: isAddress(tokenAddress)
      ? (tokenAddress as `0x${string}`)
      : undefined,
    functionName: 'name',
    query: {
      enabled: isAddress(tokenAddress),
    },
  });

  useEffect(() => {
    const newIsTokenValid =
      isAddress(tokenAddress) && !!tokenName && !isTokenNameError;
    onValidationChange(newIsTokenValid);
  }, [tokenAddress, tokenName, isTokenNameError, onValidationChange]);

  return null; // This component doesn't render anything, it just handles logic
}
