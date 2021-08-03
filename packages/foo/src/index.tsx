import React from 'react';
import { Button } from 'antd';
/**
 * Dr properties.
 */
interface Props {
  title: string;
  msg: string;
}

export default ({ title, msg }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <Button type="link">sss</Button>
    </>
  );
};
