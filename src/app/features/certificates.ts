import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Certificate {
  commonName: string,
  issuerName: string,
}

type Certificates = {
  certificates: Certificate[];
}

const initialState: Certificates = {
  certificates: [
  {
    commonName: 'Нестеренко',
    issuerName: 'НАц бАнк'
  },
  {
    commonName: 'Іванов',
    issuerName: 'Приват'
  },
  {
    commonName: 'Колома',
    issuerName: 'Моно'
  },
],
}

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    },
  },
});

export default certificatesSlice.reducer;
export const { addCertificate } = certificatesSlice.actions;