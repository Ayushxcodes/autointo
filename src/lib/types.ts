import { ConnectionProviderProps } from "@/providers/connections-provider";
import z from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Invalid email"), // this is fine
  name: z.string().min(1, "Required"), // must be a non-empty string
});

export const WorkflowFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}
