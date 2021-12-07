import { Form, Icon } from 'react-bulma-components';

const FormInput = ({ label, name, type, value, icon, onChange, validate }) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control>
        <Form.Input
          type={type || 'text'}
          name={name}
          value={value}
          onChange={onChange}
        />
        <Icon align="left">
          <i className={icon} />
        </Icon>
        {(validate ? validate(value) : value) && (
          <Icon align="right">
            <i className="fas fa-check" />
          </Icon>
        )}
      </Form.Control>
    </>
  );
};
export default FormInput;
