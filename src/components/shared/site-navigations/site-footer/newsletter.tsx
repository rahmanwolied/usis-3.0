import React, { Fragment } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Newsletter = () => {
  return (
    <Fragment>
      <h3 className="text-sm font-semibold leading-6 text-white">
        Subscribe to our newsletter
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-300">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
      <form className="mt-6 sm:flex sm:max-w-md">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <Input
          required
          type="email"
          name="email-address"
          id="email-address"
          autoComplete="email"
          placeholder="Enter your email"
        />
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

Newsletter.displayName = 'Newsletter'

export default Newsletter
