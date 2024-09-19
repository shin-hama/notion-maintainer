import { Client, isFullPage } from '@notionhq/client'
import { startOfMonth, subMonths } from 'date-fns'

export async function removeOldItems() {
  console.log(process.env.NOTION_TOKEN)
  const databaseId = process.env.NOTION_DATABASE_ID
  const notion = new Client({ auth: process.env.NOTION_TOKEN })

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Date',
      date: {
        // 1 month ago
        on_or_before: startOfMonth(subMonths(new Date(), 1)).toISOString(),
      },
    },
    page_size: 100,
  })

  console.log(
    response.results
      .filter(isFullPage)
      .map((page) =>
        page.properties.Name.type === 'title' ? page.properties.Name.title[0].plain_text : '',
      ),
  )

  for (const page of response.results
    .filter(isFullPage)
    .filter((page) => page.archived === false)) {
    await notion.blocks.delete({
      block_id: page.id,
    })
  }
}
