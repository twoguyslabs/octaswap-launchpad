import { createClient } from '@/lib/supabase/client';
import { Tables } from '../types/sales';

// Read

export async function getSales() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('octaswap_launchpad_sales')
    .select();
  return {
    data: data as Tables<'octaswap_launchpad_sales'>[],
    error,
  };
}

export async function getSale(address: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('octaswap_launchpad_sales')
    .select()
    .eq('sale_address', address);
  return {
    data: data as Tables<'octaswap_launchpad_sales'>[],
    error,
  };
}

// Write

export async function createSale(sale: {
  sale_address: string;
  owner: string;
  project_logo: string;
  sale_title: string;
  sale_description: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  discord_url: string;
}) {
  const supabase = createClient();
  const { error } = await supabase
    .from('octaswap_launchpad_sales')
    .insert([sale]);
  return { error };
}
