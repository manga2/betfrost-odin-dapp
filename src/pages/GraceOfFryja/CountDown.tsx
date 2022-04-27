import * as React from 'react';
import { Row } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { paddingTwoDigits } from '../../utils/convert';

const CountDown = (props) => {
  const [leftTime, setTargetTimestamp] = React.useState<number>(600000000);
  React.useEffect(() => {
    setTargetTimestamp(props.saleStatus ? props.saleStatus.leftTimestamp - Date.now() : 600000000);
  }, [props.saleStatus]);

  
  interface Props {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }

  const renderer: React.FC<Props> = ({ days, hours, minutes, seconds }) => {
    return (
      <Row className='custom-timer'>
          <div className='customer-timer-time'>{days}d : {hours}h : {minutes}m : {seconds}s</div>
      </Row>
    );
  };

  return (
    <Countdown date={Date.now() + leftTime} renderer={renderer} />
  );
};

export default CountDown;