import { isValid } from 'iban';
import {
  GiroCodeEncoding,
  GiroCodeIdentification,
  GiroCodeProps,
} from './types';

const normalizeIBAN = (input: string): string =>
  input
    .replace(/[^A-Z0-9]/g, '')
    .trim()
    .toUpperCase();

const normalizeText = (input: string | undefined, maxLength: number): string =>
  input ? input.trim().substring(0, maxLength) : '';

/** Generates a GiroCode (EPC QR code) string or returns `undefined` if invalid data has been passed */
const giroCode = (props: GiroCodeProps): string | undefined => {
  const defaults: GiroCodeProps = {
    service: 'BCD',
    version: '002',
    encoding: GiroCodeEncoding.UTF8,
    transfer: GiroCodeIdentification.SCT,
    bic: '',
    name: '',
    iban: '',
    currency: 'EUR',
    amount: 0,
    code: '',
    ref: '',
    purpose: '',
    hint: '',
  };
  const result: GiroCodeProps = {
    ...defaults,
    ...props,
    iban: normalizeIBAN(props.iban),
  };

  if (
    // Catch invalid IBANs
    !isValid(result.iban) ||
    // Catch missing BIC (which is required in version 1)
    (result.version === '001' && !result.bic)
  ) {
    return undefined;
  }

  return [
    result.service,
    result.version,
    result.encoding,
    result.transfer,
    result.bic,
    normalizeText(result.name, 70),
    result.iban,
    `${normalizeText(result.currency, 3).toUpperCase()}${(
      result.amount ?? 0
    ).toFixed(2)}`,
    normalizeText(result.code, 4),
    normalizeText(result.ref, 25),
    normalizeText(result.purpose, 140),
  ].join('\n');
};

export default giroCode;
export * from './types';
