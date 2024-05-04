'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Themeresolver = () => {
  const [isMount, setIsMount] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setIsMount(true), []);

  if (!isMount) {
    return;
  }

  if (resolvedTheme === 'dark') {
    return <MdLightMode onClick={() => setTheme('light')} size={25} className="cursor-pointer" />;
  }

  if (resolvedTheme === 'light') {
    return <MdDarkMode onClick={() => setTheme('dark')} size={25} className="cursor-pointer" />;
  }
};

export default Themeresolver;
