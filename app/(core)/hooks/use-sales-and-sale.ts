import { useEffect, useState } from 'react';
import { getSale, getSales } from '../db/functions';
import { Tables } from '../types/sales';

export default function useSalesAndSale(saleAddress?: string) {
  const [sales, setSales] = useState<Tables<'octaswap_launchpad_sales'>[]>();
  const [sale, setSale] = useState<Tables<'octaswap_launchpad_sales'>>();

  useEffect(() => {
    const fetchSales = async () => {
      const { data, error } = await getSales();

      if (error?.message) {
        return;
      }

      setSales(data);
    };

    const fetchSale = async () => {
      if (!saleAddress) {
        return;
      }

      const { data, error } = await getSale(saleAddress);

      if (error?.message) {
        return;
      }

      setSale(data[0]);
    };

    fetchSales();
    fetchSale();
  }, [saleAddress]);

  return { sales, sale };
}
