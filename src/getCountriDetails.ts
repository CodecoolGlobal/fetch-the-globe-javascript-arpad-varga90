type CountryDetails = {
  name: {
    common: string;
    official: string;

    cca3: string;
    flag: string;
    flags: {
      png: string;
      svg: string;
      alt: string;
    };
  };
};

export default async function getCountryDetails(
  url: string,
  cca3: string
): Promise<CountryDetails> {
  const response = await fetch(`${url}/${cca3}`);
  const details = await response.json();
  return details;
}
