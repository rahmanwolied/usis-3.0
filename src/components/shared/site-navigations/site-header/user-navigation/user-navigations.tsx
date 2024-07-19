import React from 'react'
import Link from 'next/link'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { SignalIcon } from '@heroicons/react/24/solid'
import { Activity, Network, Settings2, User2 } from 'lucide-react'

import useMetamaskSDK from '@/hooks/use-metamask-sdk'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

const userNavigations = [
  {
    name: 'Profile',
    icon: User2,
    href: '#',
    subItems: [],
  },
  {
    name: 'Settings',
    icon: Settings2,
    href: '#',
    subItems: [],
  },
  {
    name: 'Collections',
    icon: Squares2X2Icon,
    href: '#',
    subItems: [],
  },
  {
    name: 'Networks',
    icon: Network,
    href: '#',
    subItems: [
      {
        name: 'Main',
        icon: SignalIcon,
        href: '#',
      },
      {
        name: 'Test',
        icon: Activity,
        href: '#',
      },
    ],
  },
]

const UserNavigations = () => {
  const { account } = useMetamaskSDK()
  userNavigations[0].href = `/profile/${account}`
  return (
    <DropdownMenuGroup>
      {userNavigations.map((navigation) => {
        if (navigation.subItems.length > 0) {
          return (
            <DropdownMenuSub key={navigation.name}>
              <DropdownMenuSubTrigger>
                <navigation.icon className="mr-2 size-4" />
                <span>{navigation.name}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {navigation.subItems.map((subItem) => {
                    const Icon = subItem.icon
                    return (
                      <Link key={subItem.name} href={subItem.href}>
                        <DropdownMenuItem key={subItem.name}>
                          <Icon className="mr-2 size-4" />
                          {subItem.name}
                        </DropdownMenuItem>
                      </Link>
                    )
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )
        } else {
          return (
            <Link key={navigation.name} href={navigation.href}>
              <DropdownMenuItem key={navigation.name}>
                <navigation.icon className="mr-2 size-4" />
                <span>{navigation.name}</span>
              </DropdownMenuItem>
            </Link>
          )
        }
      })}
    </DropdownMenuGroup>
  )
}

UserNavigations.displayName = 'UserNavigations'

export default UserNavigations
