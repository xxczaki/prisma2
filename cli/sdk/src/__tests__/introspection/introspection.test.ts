import { IntrospectionEngine } from '../../IntrospectionEngine'
import path from 'path'

test('basic introspection', async () => {
  const engine = new IntrospectionEngine({
    cwd: __dirname,
  })

  const result = await engine.introspect(
    `file:${path.resolve(__dirname, 'blog.db')}`,
  )
  expect(result).toMatchInlineSnapshot(`
    "model User {
      age     Int     @default(0)
      amount  Float   @default(0)
      balance Float   @default(0)
      email   String  @default(\\"\\") @unique
      id      Int     @default(autoincrement()) @id
      name    String?
      role    String  @default(\\"USER\\")
      posts   Post[]
    }

    model Post {
      content   String?
      createdAt DateTime
      kind      String?
      published Boolean  @default(false)
      title     String   @default(\\"\\")
      updatedAt DateTime
      uuid      String   @id
      author    User
    }"
  `)
  const metadata = await engine.getDatabaseMetadata(
    `file:${path.resolve(__dirname, 'blog.db')}`,
  )
  expect(metadata).toMatchInlineSnapshot(`
    Object {
      "size_in_bytes": 0,
      "table_count": 3,
    }
  `)
  const databases = await engine.listDatabases(
    `file:${path.resolve(__dirname, 'blog.db')}`,
  )
  expect(databases).toMatchInlineSnapshot(`
    Array [
      "",
      "blog.db",
    ]
  `)
  engine.stop()
})
