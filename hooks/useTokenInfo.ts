import { erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export default function useTokenInfo(tokenAddress: string | undefined) {
  const { data: tokenName } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'name',
  });

  const { data: tokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'symbol',
  });

  const { data: tokenDecimals } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'decimals',
  });

  const { data: tokenTotalSupply } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'totalSupply',
  });

  return { tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply };
}
