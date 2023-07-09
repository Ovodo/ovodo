import { IconBrandTwitter } from "@tabler/icons-react";
import { IconBrandInstagram } from "@tabler/icons-react";
import { IconBrandMeta } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";

const Footer = () => {
  return (
    <div className='bg-thatGreen h-[10vh] px-[2vw] flex  items-center justify-between'>
      <p className='text-lemon font-semiboold text-lg'>Ovdizzle Inc.</p>
      <div className='flex mt-2'>
        <a
          href='https://twitter.com/ovdizle'
          target='_blank'
          className='text-lemon hover:text-gray-300 mx-2'
        >
          <IconBrandTwitter />
        </a>
        <a
          href='https://instagram.com/ovdizle'
          target='_blank'
          className='text-lemon hover:text-gray-300 mx-2'
        >
          <IconBrandInstagram />
        </a>
        <a
          href='https://facebook.com/ovdizle'
          target='_blank'
          className='text-lemon hover:text-gray-300 mx-2'
        >
          <IconBrandMeta />
        </a>
        <a
          href='https://github.com/ovdizle'
          target='_blank'
          className='text-lemon hover:text-gray-300 mx-2'
        >
          <IconBrandGithub />
        </a>
      </div>
    </div>
  );
};

export default Footer;
