import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './RatesList.module.css';

export interface Rates {
  key: string;
  value: number;
}
interface RatesListProps {
  rates: Rates[];
}

export default function RatesList({ rates }: RatesListProps) {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  return (
    <ul className={styles.list}>
      {rates.map(({ key, value }) => (
        <li className={styles.item} key={key}>
          <p className={styles.text}>
            1 {key} = {value} {baseCurrency}
          </p>
        </li>
      ))}
    </ul>
  );
}
