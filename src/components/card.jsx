/* eslint-disable react/prop-types */
export default function Card({ text, imgUrl, onClick, alt = text }) {
  return (
    <button onClick={onClick}>
      <img src={imgUrl} alt={alt} />
      {text}
    </button>
  );
}
