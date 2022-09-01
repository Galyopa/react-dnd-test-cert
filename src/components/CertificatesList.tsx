import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  'chats__link',
  { 'chats__link-active': status.isActive },
);


export const CertificatesList: FC = () => {
  const certificates = useAppSelector(state => state.certificates.certificates);

  return (
    <ul className="certificates__list">
      {
        certificates.map(certificate => (
          <li className="certificates__item" key={certificate.commonName}>
            <NavLink
              className={getActiveClasses}
              to={certificate.commonName}
            >
              <h2>{certificate.commonName}</h2>
            </NavLink>
          </li>
          ))
      }
      <div className="certificate-info">
        <Outlet />
      </div>
    </ul>
  );
};