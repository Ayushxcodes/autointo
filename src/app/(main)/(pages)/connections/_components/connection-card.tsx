import { ConnectionTypes } from '@/lib/types'
import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  type: ConnectionTypes
  icon: string
  title: ConnectionTypes
  description: string
  callback?: () => void
  connected: {} & any
}

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {
  return (
    <Card className="flex w-full rounded-2xl border p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Image
          src={icon}
          alt={title}
          height={48}
          width={48}
          className="object-contain"
        />
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-gray-500">
            {description}
          </CardDescription>

          <div className="mt-4">
            {/* {connected[type] ? (
              <div className="inline-block rounded-lg border border-green-600 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                Connected
              </div>
            ) : ( */}
              <Link
            href={
              title == 'Discord'
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title == 'Notion'
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title == 'Slack'
                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                : '#'
            }
            className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
          >
                Connect
              </Link>
            {/* )} */}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ConnectionCard
