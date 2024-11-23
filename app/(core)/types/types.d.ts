type SaleStatusIndex = 0 | 1 | 2;
type SaleStatus = 'All' | 'Open' | 'Upcoming' | 'Closed';

type SalePool = {
  rate: bigint;
  softcap: bigint;
  hardcap: bigint;
  liquidityFunds: bigint;
  liquidityTokens: bigint;
  startTimestamp: bigint;
  endTimestamp: bigint;
  tokenAddress: string;
};
