/* eslint-disable react/prop-types */
export default function Card({ text, imgUrl, onClick, alt = text }) {
  return (
    <button onClick={onClick} className="card">
      <img src={imgUrl} alt={`${alt} pokemon`} />
      {text}
    </button>
  );
}
