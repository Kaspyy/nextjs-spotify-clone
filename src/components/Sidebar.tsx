import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from 'assets';
import { links } from 'assets/constants';
import Image from 'next/future/image';
import Link from 'next/link';
import { HiOutlineMenu } from 'react-icons/hi';

const NavLinks = ({ handleClick }: { handleClick?: () => void }) => (
  <div className='mt-10'>
    {links.map(link => (
      <Link href={link.url} key={link.title}>
        <a
          className='my-8 flex flex-row items-center justify-start text-sm font-medium text-gray-400 hover:text-cyan-400'
          onClick={() => handleClick && handleClick()}
        >
          <link.icon className='mr-2 h-6 w-6' />
          {link.title}
        </a>
      </Link>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='hidden w-[240px] flex-col bg-[#191624] py-10 px-4 md:flex'>
        <Image
          src={logo}
          alt='logo'
          width={64}
          height={64}
          className='h-14 w-full object-contain'
        />
        <NavLinks />
      </div>

      <div className='absolute top-6 right-3 block md:hidden'>
        {mobileMenuOpen ? (
          <RiCloseLine
            className='mr-2 h-6 w-6 text-white'
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className='mr-2 h-6 w-6 text-white'
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`smooth-transition absolute top-0 z-10 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] p-6 backdrop-blur-lg md:hidden ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <Image
          src={logo}
          alt='logo'
          width={64}
          height={64}
          className='h-14 w-full object-contain'
        />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
