import { PropTypes } from 'prop-types';
import React from 'react';
import { Pagination } from '@material-ui/core';
import { Block } from '../pages/components-overview/Block';

export const PaginationA = ({ volatile, page, handleChange }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': { my: 1 }
  };
  // console.log(volatile, 'volatile');

  return (
    <Block sx={style}>
      <Pagination
        count={volatile !== undefined ? Math.ceil(volatile?.count / 10 || 0) : 0}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Block>
  );
};

PaginationA.propTypes = {
  volatile: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  page: PropTypes.number,
  handleChange: PropTypes.func
};
