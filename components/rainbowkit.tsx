'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { octaspace } from '@/config/chains';

const config = getDefaultConfig({
  appName: 'OctaSwap Launchpad',
  projectId: 'f90da1f0527c6cbb408a7c7955a3a785',
  chains: [octaspace],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
export default function RainbowKit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
