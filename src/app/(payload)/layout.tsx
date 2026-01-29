/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'
import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

const serverFunction = async (args: any) => {
  'use server'
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  // @ts-expect-error - serverFunction exists at runtime
  return payload.serverFunction?.(args) ?? args
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction as any}>
    {children}
  </RootLayout>
)

export default Layout
