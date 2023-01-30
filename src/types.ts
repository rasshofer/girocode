export type GiroCodeVersion = '001' | '002';

export enum GiroCodeEncoding {
  UTF8 = '1',
  ISO88591 = '2',
  ISO88592 = '3',
  ISO88594 = '4',
  ISO88595 = '5',
  ISO88597 = '6',
  ISO885910 = '7',
  ISO885915 = '8',
}

export enum GiroCodeIdentification {
  /** SEPA credit transfer */
  SCT = 'SCT',
}

/** @see https://www.europeanpaymentscouncil.eu/document-library/guidance-documents/quick-response-code-guidelines-enable-data-capture-initiation */
export type GiroCodeProps = {
  /** Service tag (static) */
  service?: 'BCD';
  /** Version */
  version?: GiroCodeVersion;
  /** Character encoding */
  encoding?: GiroCodeEncoding;
  /** Identification */
  transfer?: GiroCodeIdentification;
  /** Name of the beneficiary (i.e. max 70 characters) */
  name: string;
  /** IBAN */
  iban: string;
  /** BIC (required if version 1 is used) */
  bic?: string;
  /** Currency (i.e. 3-letter code according to ISO 4217) */
  currency?: string;
  /** Amount */
  amount?: number;
  /** Purpose (i.e. four-digit letter code according to SEPA purpose codes) */
  code?: string;
  /** Reference (if no custom purpose text is provided, i.e. structured 25-character code according to ISO 11649 Creditor Reference) */
  ref?: string;
  /** Purpose text (i.e. max 140 characters) */
  purpose?: string;
  /** Optional hint/information text displayed to the user (i.e. max 70 characters) */
  hint?: string;
};
