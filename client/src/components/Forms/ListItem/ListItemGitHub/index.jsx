import { string } from 'prop-types';
import React from 'react';

const ListITemGitHub = ({ value }) => (
  !value
    ? <p>n/a</p>
    : (
      <a
        href={`https://github.com/${value}`}
        target='_blank'
        rel='noreferrer'
      >
        {`https://github.com/${value}`}
      </a>
    )
);

ListITemGitHub.propTypes = {
  value: string,
};

ListITemGitHub.defaultProps = {
  value: '',
};

export default ListITemGitHub;
