/// <reference types="react-scripts" />
export interface Certificate {
  id: string;
  commonName: string,
  issuerName: string,
  validFrom: string,
  validTo: string,
}