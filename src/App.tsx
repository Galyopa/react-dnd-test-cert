import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddCertificate } from "./components/AddCertificate";
import { CertificatesList } from "./components/CertificatesList";
import { СertificateInfo } from "./components/СertificateInfo";

export const App: FC = () => (
  <div className="page__container">
    <Routes>
      <Route path="/" element={<CertificatesList />}>
        <Route
          index
          element={
            <div className="certificates__empty">
              <p>Виберіть сертифікат, щоб переглянути інформацію</p>
            </div>
          }
        />
        <Route path="/add" element={<AddCertificate />} />
        <Route path=":commonName" element={<СertificateInfo />} />
      </Route>
      <Route path="home" element={<Navigate to="/" />} />
    </Routes>
  </div>
);
