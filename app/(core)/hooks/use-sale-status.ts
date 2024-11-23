import { useReadContract } from 'wagmi';

import { SALE_ABI } from '@/contracts/abis';
import { useEffect, useState } from 'react';

export default function useSaleStatus(saleAddress: string | undefined) {
  const [status, setStatus] = useState<SaleStatusIndex>();

  const { data: isOpen } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'isOpen',
  });

  const { data: isClosed } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'isClosed',
  });

  useEffect(() => {
    if (!isOpen && !isClosed) {
      setStatus(0);
    } else if (isOpen) {
      setStatus(1);
    } else if (isClosed) {
      setStatus(2);
    }
  }, [isOpen, isClosed]);

  return status;
}
