type Country = {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capitals: Array<string>;
};

export default async function getCountries(url: string): Promise<Country[]> {
  const response = await fetch(url);
  const countries = await response.json();
  
  return countries;
}
