import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../lib/prisma'
import { dayjs } from '../lib/dayjs'
import z from 'zod'
import { ClientError } from '../errors/client-error'

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/trips/:tripId/activities',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async request => {
      const { title, occurs_at } = request.body
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      })

      if (!trip) {
        throw new ClientError('Trip not found')
      }

      if (dayjs(occurs_at).isBefore(dayjs(trip.starts_at))) {
        throw new ClientError('Activity cannot occur before the trip starts')
      }
      
      if (dayjs(occurs_at).isAfter(dayjs(trip.ends_at))) {
        throw new ClientError('Activity cannot occur after the trip ends')
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId,
        },
      })

      return { activity: activity.id }
    }
  )
}
