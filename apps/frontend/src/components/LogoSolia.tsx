import Image from 'next/image';

export default function LogoSolia() {
  return (
    <Image
      src="/logo@2x.png"
      alt="Logo Solia"
      width={120}
      height={120}
      priority
    />
  );
}
