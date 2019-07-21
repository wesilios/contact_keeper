import React, { useContext, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Icon } from 'semantic-ui-react';

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    <Fragment>
      <TransitionGroup>
        {alerts.length > 0 &&
          alerts.map(alert => (
            <CSSTransition key={alert.id} classNames='item' timeout={200}>
              <div className={`alert alert-${alert.type}`}>
                <Icon name='info circle' /> {alert.msg}
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Alert;
