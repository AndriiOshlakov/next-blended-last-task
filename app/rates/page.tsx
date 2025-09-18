'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { useEffect, useState } from 'react';
import { latestRates } from '@/lib/service/exchangeAPI';
import RatesList, { Rates } from '@/components/RatesList/RatesList';
import Loader from '@/components/Loader/Loader';

export default function RatesPage() {
  const [rates, setRates] = useState<Rates[]>([]);
  const [isError, setIsError] = useState(false);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const setIsLoading = useCurrencyStore((state) => state.setIsLoading);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await latestRates(baseCurrency);
        console.log(response);

        const filteredRates = response
          .filter(([key]) => key !== baseCurrency)
          .map(([key, value]) => ({ key, value: Number((1 / value).toFixed(2)) }));
        setRates(filteredRates);
      } catch (error) {
        if (error) setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, setIsError, setIsLoading]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {isLoading && <Loader />}
          {rates.length > 0 && <RatesList rates={rates} />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
