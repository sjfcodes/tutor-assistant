import { Footer as BulmaFooter } from 'react-bulma-components';

const Footer = () => {
  return (
    <BulmaFooter className="has-text-centered p-3">
      <p>
        <a
          href="https://github.com/samuelfox1/tutor-assistant-api"
          className="has-text-weight-bold "
        >
          Tutor Helper
        </a>{' '}
        by{' '}
        <a
          className="has-text-black has-text-weight-bold"
          href="https://github.com/samuelfox1"
        >
          Samuel Fox{' '}
        </a>{' '}
        and
        <a
          className="has-text-black has-text-weight-bold"
          href="https://github.com/Tuzosdaniel12"
        >
          {' '}
          Daniel Soledad
        </a>
        .
      </p>
      <p>
        The source code is licensed under
        <a
          className="has-text-black has-text-weight-medium"
          href="http://opensource.org/licenses/mit-license.php"
        >
          {' '}
          MIT
        </a>
        .
      </p>
    </BulmaFooter>
  );
};
export default Footer;
