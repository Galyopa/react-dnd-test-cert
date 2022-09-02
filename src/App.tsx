import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddCertificate } from "./components/AddCertificate";
import { CertificatesList } from "./components/CertificatesList";
import { CertificateInfo } from "./components/СertificateInfo";
import "./App.scss";
import "./Cert.scss";

export const App: FC = () => (
  <div className="cert">
    <Routes>
      <Route path="/" element={<CertificatesList />}>
        <Route
          index
          element={
            <div className="cert__empty">
              <p>Виберіть сертифікат, щоб переглянути інформацію</p>
            </div>
          }
        />
        <Route path="/add" element={<AddCertificate />} />
        <Route path=":cerId" element={<CertificateInfo />} />
      </Route>
      <Route path="home" element={<Navigate to="/" />} />
    </Routes>
  </div>
);
