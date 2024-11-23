import { getParamAsString } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function useStringParam(key: string): string | undefined {
  const params = useParams();
  return getParamAsString(params[key]);
}
