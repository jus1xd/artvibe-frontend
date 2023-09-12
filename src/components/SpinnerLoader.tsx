import "../index.css"; // Create a CSS file to style the spinner

type TProps = {
  size: number;
};

const Spinner: React.FC<TProps> = ({ size }) => {
  return (
    <div
      className="spinner"
      style={{ borderColor: "#FFF", borderTopColor: "#635BFF", borderWidth: size / 9 }}
    >
      <div
        className="inner-spinner"
        style={{ width: size, height: size }}
      ></div>
    </div> 
  );
};

export default Spinner;
