import { app, HttpHandler, InvocationContext, Timer } from '@azure/functions'
import { removeOldItems } from './notion/remove-old-items'

export async function notionMaintainer(myTimer: Timer, context: InvocationContext): Promise<void> {
  context.log('Timer function processed request.')
}

export const notionMaintainerDev: HttpHandler = (req, context) => {
  removeOldItems()

  return {
    status: 200,
    body: 'Hello from Notion Maintainer!',
  }
}

app.timer('notionMaintainer', {
  schedule: '0 0 12 1 * *',
  handler: notionMaintainer,
})

app.http('notionMaintainerDev', {
  methods: ['GET'],
  handler: notionMaintainerDev,
})
