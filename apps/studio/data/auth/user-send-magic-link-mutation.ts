import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { handleError, post } from 'data/fetchers'
import type { ResponseError } from 'types'
import type { User } from './users-infinite-query'

export type UserSendMagicLinkVariables = {
  projectRef: string
  user: User
}

export async function sendMagicLink({ projectRef, user }: UserSendMagicLinkVariables) {
  const { data, error } = await post('/platform/auth/{ref}/magiclink', {
    params: { path: { ref: projectRef } },
    body: { email: user.email },
  })

  if (error) handleError(error)

  return data
}

type UserSendMagicLinkData = Awaited<ReturnType<typeof sendMagicLink>>

export const useUserSendMagicLinkMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<UserSendMagicLinkData, ResponseError, UserSendMagicLinkVariables>,
  'mutationFn'
> = {}) => {
  return useMutation<UserSendMagicLinkData, ResponseError, UserSendMagicLinkVariables>(
    (vars) => sendMagicLink(vars),
    {
      async onSuccess(data, variables, context) {
        // [Joshen] If we need to invalidate any queries
        await onSuccess?.(data, variables, context)
      },
      async onError(data, variables, context) {
        if (onError === undefined) {
          toast.error(`Failed to send magic link: ${data.message}`)
        } else {
          onError(data, variables, context)
        }
      },
      ...options,
    }
  )
}
