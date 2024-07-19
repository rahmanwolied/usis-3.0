'use client'

import React from 'react'
import { Unplug } from 'lucide-react'

import useMetamaskSDK from '@/hooks/use-metamask-sdk'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const DisconnectWallet = () => {
  const { disconnect } = useMetamaskSDK()

  return (
    <DropdownMenuItem onSelect={disconnect}>
      <Unplug className="mr-2 size-4" />
      <span>Disconnect</span>
    </DropdownMenuItem>
  )
}

DisconnectWallet.displayName = 'DisconnectWallet'

export default DisconnectWallet
