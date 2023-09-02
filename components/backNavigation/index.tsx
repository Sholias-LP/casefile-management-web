import { useRouter } from 'next/router';
import ArrowBack from '../../components/assets/arrowBack.svg';
import React from 'react';
import { Flex, Paragraph } from 'truparse-lodre';

interface IBackNavigation {
  label?: string;
  backTo?: string;
  setStep?: () => void;
}

const BackNavigation = ({ backTo, setStep, label }: IBackNavigation) => {
  const router = useRouter();

  return (
    <Flex>
      <span
        onClick={() => {
          backTo ? router.push(backTo) : setStep ? setStep() : router.back();
        }}
        style={{ cursor: 'pointer' }}
      >
        <ArrowBack />
      </span>
      <Paragraph weight="w600">{label}</Paragraph>
    </Flex>
  );
};

export default BackNavigation;
