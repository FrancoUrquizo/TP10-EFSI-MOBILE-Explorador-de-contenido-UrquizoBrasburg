import { useState, useEffect } from 'react';
import { config } from '../config';

const PAGE_SIZE = 100;

const mapCountry = (c) => ({
  cca3: c.codes?.alpha_3 || c.codes?.alpha_2 || c.names?.common || 'N/A',
  name: c.names?.common || 'Sin nombre',
  flag: c.flag?.url_png || c.flag?.url_svg || null,
  capital: c.capitals?.[0]?.name || 'Sin capital',
  continent: c.continents?.[0] || 'Desconocido',
  population: c.population ?? null,
  languages: c.languages?.map((language) => language.name).filter(Boolean) || [],
  currencies:
    c.currencies
      ?.map((currency) => ({
        name: currency.name,
        code: currency.code,
        symbol: currency.symbol,
      }))
      .filter((currency) => currency.name || currency.code) || [],
});

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const all = [];
        const fields =
          'response_fields=names.common,codes.alpha_3,flag.url_png,capitals.name,continents,population,languages.name,currencies.name,currencies.code,currencies.symbol';
        let offset = 0;
        let total = Infinity;
        while (offset < total) {
          const response = await fetch(
            `${config.apiUrl}?limit=${PAGE_SIZE}&offset=${offset}&${fields}`,
            { headers: { Authorization: `Bearer ${config.apiKey}` } }
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const json = await response.json();
          const objects = json.data?.objects || [];
          all.push(...objects.map(mapCountry));
          total = json.data?.meta?.total ?? all.length;
          offset += PAGE_SIZE;
        }
        all.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(all);
      } catch (e) {
        console.error('Error en useCountries:', e);
        setError({
          message: 'Error al cargar los países. Intentá de nuevo.',
          detail: e?.message || e?.toString?.() || 'Error desconocido',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};
