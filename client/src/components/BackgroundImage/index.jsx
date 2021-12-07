import './style.css';

const BackgroundImage = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return <div className="background-image" style={styles} />;
};

export default BackgroundImage;
