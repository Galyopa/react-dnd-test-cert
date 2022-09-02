import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Certificate } from '../../react-app-env';

type Certificates = {
  certificates: Certificate[];
}

const initialState: Certificates = {
  certificates: [],
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