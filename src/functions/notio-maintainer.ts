import { app, InvocationContext, Timer } from '@azure/functions'

export async function notionMaintainer(myTimer: Timer, context: InvocationContext): Promise<void> {
  context.log('Timer function processed request.')
}

app.timer('notionMaintainer', {
  schedule: '0 0 0 1 * *',
  handler: notionMaintainer,
})
