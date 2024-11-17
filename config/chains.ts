import { Chain } from 'viem';

export const octaspace = {
  id: 800001,
  name: 'Octa Space',
  nativeCurrency: { name: 'Octa Space', symbol: 'OCTA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.octa.space/'] },
  },
  blockExplorers: {
    default: { name: 'Octa Scan', url: 'https://scan.octa.space/' },
  },
} as const satisfies Chain;
