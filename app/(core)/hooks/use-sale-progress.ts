import { useEffect, useState } from 'react';
import { formatEther } from 'viem';

export function useSaleProgress(
  raised: bigint | undefined,
  hardcap: bigint | undefined
) {
  const [progress, setProgress] = useState<number>(0);

  const progressPercentage = `${progress.toFixed(2)}%`;

  useEffect(() => {
    if (raised && hardcap) {
      const hardcapAmount = Number(formatEther(hardcap));

      // Calculate progress percentage
      const progressPercentage =
        (Number(formatEther(raised)) / hardcapAmount) * 100;

      setProgress(Math.min(progressPercentage, 100));
    }
  }, [raised, hardcap]);

  return {
    progress,
    progressPercentage,
  };
}
