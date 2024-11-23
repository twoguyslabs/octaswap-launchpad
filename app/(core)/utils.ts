import { formatEther } from 'viem';

export function getSaleStatus(status: SaleStatusIndex | undefined) {
  const SALE_STATUS_MAPPING: Record<SaleStatusIndex, SaleStatus> = {
    1: 'Open',
    0: 'Upcoming',
    2: 'Closed',
  };

  if (typeof status === 'undefined') {
    return;
  }

  return SALE_STATUS_MAPPING[status];
}

export const formatStatus = (status: string | undefined) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : '';

export const getStatusColor = (status: SaleStatus | undefined) => {
  switch (status) {
    case 'Open':
      return 'bg-emerald-500';
    case 'Upcoming':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export function formatBigIntEther(value: bigint | undefined | null): string {
  return value ? formatEther(value) : '0';
}

export function calculateAllocationRemaining(
  allocation: string,
  purchased: string
): number {
  return Math.max(parseFloat(allocation) - parseFloat(purchased), 0);
}

export function calculateLiquidityPercentage(
  liquidityFunds: bigint | undefined | null
): number {
  return liquidityFunds ? Number(liquidityFunds) / 100 : 0;
}

export function formatTimestamp(timestamp: bigint | undefined | null): string {
  return timestamp
    ? new Date(Number(timestamp) * 1000).toLocaleDateString()
    : 'TBA';
}
