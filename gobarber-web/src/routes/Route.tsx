import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/* Se o isPrivate não estiver presente, seu valor padrão é falso */
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

/*
  - Se a rota for privada e o usuário não estiver logado, enviar para o login
  - Se a rota for privada e o usuário estiver logado, enviar para o dashboard
  - Senão a rota mostrará o componente da maneira que precisa mostrar
*/

/*
  true/true = Rota é privada, usuário autenticado => Ok
  true/false = Rota é privada, usuário não autenticado => Redirecionar ao login
  false/true = Rota não é privada, usuário está autenticado => Redirecionar ao dashboard
  false/false = Rota não é privada, usuário não está autenticado => Ok

*/
