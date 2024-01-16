'use client'
import { atom, useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { MdDarkMode } from 'react-icons/md'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
export const themeAtom = atom<'dark' | 'light'>('dark')

/**
 * A navbar for the website. Right now it only handles the managing of the color theme
 * @returns 
 */
function Nav() {
  const [theme, toggleTheme] = useAtom(themeAtom)

  const updateTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    const isDarkMode = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    toggleTheme(isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }

  //At the start it will set the theme to be the one from the system
  useEffect(() => {
    updateTheme('system')
  }, [])

  return (
    <nav className=" !m-0 animate-fadeIn flex !h-[50px] max-h-[50px] w-full items-center border-b-[1px] border-black p-0 dark:border-stone-600 ">
      <Select defaultValue={'system'} onValueChange={(e) => updateTheme(e)}>
        <SelectTrigger className=" !my-0 ml-12 !h-[30px] !w-[30px] rounded-full border-stone-400 !p-1 dark:border-stone-700 ">
          <MdDarkMode
            color={`${theme === 'dark' ? '#fff' : '#000'}`}
            className=" "
            size={20}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </nav>
  )
}

export default Nav
