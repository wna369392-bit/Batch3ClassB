import Image from "next/image";
export default function LocalImage() {
  return (
    <Image
      src="/profile.jpeg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
  );
}
