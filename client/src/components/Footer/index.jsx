import { string } from 'prop-types';
import React from 'react';
import { Columns, Footer as BulmaFooter } from 'react-bulma-components';
import './style.css';

const Footer = ({ className }) => (
  <BulmaFooter className={className}>
    <Columns
      className='is-mobile'
    >
      <Columns.Column
        textAlign='center'
      >
        <a className='is-size-7 hover-large-item contact' href='mailto:samueljasonfox@gmail.com?&subject=tutor.me' target='_blank' rel='noreferrer'>
          <i className='far fa-envelope' />
          {' '}
          Contact
        </a>
      </Columns.Column>
      <Columns.Column
        textAlign='center'
      >
        <a className='hover-large-item contact' href='https://github.com/samuelfox1/tutor-assistant' target='_blank' rel='noreferrer'>
          <i className='fas fa-code-branch is-size-7 has-text-black border py-1 px-2 rounded hover-large-item' />
        </a>
      </Columns.Column>
      <Columns.Column
        textAlign='center'
      >
        <a className=' is-size-7 issue' href='https://github.com/samuelfox1/tutor-assistant/issues' target='_blank' rel='noreferrer'>
          <span>
            Rep
            <i className='fab fa-github is-size-custom' />
            rt an issue
          </span>
        </a>
      </Columns.Column>
    </Columns>
  </BulmaFooter>
);
export default Footer;

Footer.propTypes = {
  className: string,
};
Footer.defaultProps = {
  className: '',
};
