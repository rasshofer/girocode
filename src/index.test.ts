import giroCode, { GiroCodeEncoding } from '.';

describe('giroCode', () => {
  it('works with sane values', () => {
    const result = giroCode({
      name: 'Wikimedia',
      iban: 'DE33100205000001194700',
      bic: 'BFSWDE33BER',
      amount: 1.23,
    });
    expect(result).toMatchSnapshot();
  });

  it('supports custom versions', () => {
    const result = giroCode({
      version: '001',
      name: 'Wikimedia',
      iban: 'DE33100205000001194700',
      bic: 'BFSWDE33BER',
      amount: 1.23,
    });
    expect(result).toMatchSnapshot();
  });

  it('supports custom encoding', () => {
    const result = giroCode({
      encoding: GiroCodeEncoding.ISO88591,
      name: 'Wikimedia',
      iban: 'DE33100205000001194700',
      bic: 'BFSWDE33BER',
      amount: 1.23,
    });
    expect(result).toMatchSnapshot();
  });

  it('supports custom currencies', () => {
    const result = giroCode({
      name: 'Wikimedia',
      iban: 'DE33100205000001194700',
      bic: 'BFSWDE33BER',
      amount: 4.56,
      currency: 'USD',
    });
    expect(result).toMatchSnapshot();
  });

  it('normalizes formatted IBANs', () => {
    const result = giroCode({
      name: 'Wikimedia',
      iban: 'DE33 1002 0500 0001 1947 00',
      bic: 'BFSWDE33BER',
      amount: 1.23,
    });
    expect(result).toMatchSnapshot();
  });

  it('normalizes text values (names, currencies, amounts, codes, references, purposes)', () => {
    const result = giroCode({
      name: 'A very very very very very very very very very very very very very very very very very very very very long name',
      iban: 'DE33     1002 0500 0001 1947 00',
      bic: 'BFSWDE33BER',
      amount: 1.23456,
      currency: 'EURO',
      code: 'ABCDEF',
      ref: 'A very very very very very very very very very very very very very very very very very very very very long reference',
      purpose:
        'A very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long purpose',
    });
    expect(result).toMatchSnapshot();
  });

  it('detects and rejects invalid IBANs', () => {
    const result = giroCode({
      name: 'Wikimedia',
      iban: 'Some invalid IBAN',
      bic: 'BFSWDE33BER',
      amount: 1.23,
    });
    expect(result).toBeUndefined();
  });

  it('detects and rejects missing BICs if version 1 is used', () => {
    const result = giroCode({
      version: '001',
      name: 'Wikimedia',
      iban: 'DE33100205000001194700',
      amount: 1.23,
    });
    expect(result).toBeUndefined();
  });
});
