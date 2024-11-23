import { useReadContract } from 'wagmi';
import { SALE_ABI } from '@/contracts/abis';

export default function useSalePool(saleAddress: string | undefined) {
  const { data: saleData } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'pool',
  });

  const salePool: SalePool = {
    rate: saleData?.[0] ?? BigInt(0),
    softcap: saleData?.[1] ?? BigInt(0),
    hardcap: saleData?.[2] ?? BigInt(0),
    liquidityFunds: saleData?.[3] ?? BigInt(0),
    liquidityTokens: saleData?.[4] ?? BigInt(0),
    startTimestamp: saleData?.[5] ?? BigInt(0),
    endTimestamp: saleData?.[6] ?? BigInt(0),
    tokenAddress: saleData?.[7] ?? '',
  };

  return salePool;
}
