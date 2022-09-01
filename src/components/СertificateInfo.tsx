import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const СertificateInfo: FC = () => {
  const { commonName } = useParams();
  const certificates = useAppSelector(state => state.certificates.certificates);
  const chatContent = certificates.find((cer) => cer.commonName === commonName);

  return (
    <div>
      {chatContent?.commonName}
      {chatContent?.issuerName}
    </div>
  )
}