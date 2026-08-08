import { useState } from "react";

export default function NoticeImage({ imageUrl, imageURL, alt, className }) {
  const [failed, setFailed] = useState(false);
  const url = imageUrl ?? imageURL;

  if (!url || failed) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-brand-seafoam"
        role="img"
        aria-label={alt}
      >
        <span className="px-6 text-center text-lg font-extrabold leading-snug tracking-tight text-brand-navy sm:text-xl">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
