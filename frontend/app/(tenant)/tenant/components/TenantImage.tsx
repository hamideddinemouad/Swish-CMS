import type { ImgHTMLAttributes } from "react";

type TenantImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fit?: "auto" | "cover" | "contain";
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function isSvgSource(src: string | undefined) {
  if (!src) {
    return false;
  }

  if (src.startsWith("data:image/svg+xml")) {
    return true;
  }

  return /\.svg(?:[?#].*)?$/i.test(src);
}

export default function TenantImage({
  src,
  alt,
  className,
  fit = "auto",
  ...props
}: TenantImageProps) {
  const resolvedFit =
    fit === "auto"
      ? isSvgSource(typeof src === "string" ? src : undefined)
        ? "object-contain"
        : "object-cover"
      : fit === "contain"
        ? "object-contain"
        : "object-cover";

  return (
    <img
      src={src}
      alt={alt}
      className={cx("block max-h-full max-w-full object-center", resolvedFit, className)}
      {...props}
    />
  );
}
