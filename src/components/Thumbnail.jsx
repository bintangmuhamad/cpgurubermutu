export default function Thumbnail({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      width={112}
      height={80}
      loading="eager"
      decoding="async"
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='112' height='80'><rect width='100%25' height='100%25' fill='%23f0edfb'/><text x='50%25' y='55%25' font-size='10' text-anchor='middle' fill='%23a78bfa' font-family='sans-serif'>No Image</text></svg>";
      }}
    />
  );
}