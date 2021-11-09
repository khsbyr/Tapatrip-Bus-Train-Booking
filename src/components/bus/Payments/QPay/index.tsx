import Image from 'next/image';
import qpayImg from '@public/assets/qpay.jpg';
export default function Payment() {
  return (
    <Image src={qpayImg} alt="Picture of the author" width={150} height={150} />
  );
}
