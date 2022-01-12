import { string } from 'prop-types';
import React from 'react';
import { Columns, Footer as BulmaFooter } from 'react-bulma-components';
import './style.css';

const Footer = ({ className }) => (
  <BulmaFooter
    className={className}
  >
    <Columns
      vCentered
      className='is-mobile mt-1'
    >
      <Columns.Column size={5} textAlign='center'>
        <a
          target='_blank'
          rel='noreferrer'
          className='contact rounded hover-large-item p-2 is-size-7'
          href='mailto:samueljasonfox@gmail.com?&subject=tutor.me'
        >
          <i className='far fa-envelope' />
          {' '}
          Contact
        </a>

      </Columns.Column>
      <Columns.Column size={2} textAlign='center'>
        <a
          target='_blank'
          rel='noreferrer'
          className='repo rounded hover-large-item p-2 px-4 is-size-4'
          href='https://github.com/samuelfox1/tutor-assistant'
        >
          <i className='fas fa-code-branch' />
        </a>
      </Columns.Column>
      <Columns.Column size={5} textAlign='center'>
        <a
          target='_blank'
          rel='noreferrer'
          className='issue rounded hover-large-item p-2 is-size-7'
          href='https://github.com/samuelfox1/tutor-assistant/issues'
        >
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
