import React from 'react'
import Link from 'next/link'

interface FooterSectionProps {
  children: React.ReactNode
}

const FooterSection = ({ children }: FooterSectionProps) => {
  return <div className="md:grid md:grid-cols-2 md:gap-8">{children}</div>
}

FooterSection.displayName = 'FooterSection'

export default FooterSection

FooterSection.Title = function FooterSectionTitle({
  children,
}: FooterSectionProps) {
  return (
    <h3 className="select-none text-sm font-semibold leading-6 text-white">
      {children}
    </h3>
  )
}

FooterSection.List = function FooterSectionList({
  children,
}: FooterSectionProps) {
  return (
    <ul role="list" className="mt-6 space-y-4">
      {children}
    </ul>
  )
}

FooterSection.ListItem = function FooterSectionListItem({
  href,
  children,
}: FooterSectionProps & { href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-6 text-gray-300 hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}
