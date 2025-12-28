import type { ActionFunctionArgs } from 'react-router'
import { Form, redirect, useLoaderData, useNavigation } from 'react-router'
import { getKnowledgeBase, updateKnowledgeBase } from '~/lib/knowledge-base'

export async function loader() {
  const currentKb = await getKnowledgeBase()
  return { currentKb }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const newKb = formData.get('knowledgeBase')

  if (typeof newKb !== 'string' || !newKb) {
    return { error: 'Content cannot be empty' }
  }

  await updateKnowledgeBase(newKb)
  return redirect('/admin?success=true')
}

export default function AdminPage() {
  const { currentKb } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const isSaving = navigation.state === 'submitting'

  return (
    <div className="container mx-auto max-w-4xl p-8 pt-24">
      <h1 className="mb-6 text-3xl font-bold">AI Knowledge Base Admin</h1>

      <p className="mb-8 text-muted-foreground">
        Update the knowledge base below. The "System Rules" are fixed and cannot be changed, but are shown for context.
      </p>

      <div className={`
        grid gap-8
        lg:grid-cols-2
      `}
      >
        {/* Read-only Rules Section */}
        {/* <div className="rounded-md border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Fixed System Rules</h2>
          <pre className="font-mono text-xs whitespace-pre-wrap text-gray-600">
            {FIXED_SYSTEM_INSTRUCTIONS}
          </pre>
        </div> */}

        {/* Editable Knowledge Base Section */}
        <div className="lg:col-span-2">
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="knowledgeBase"
                className="mb-2 block text-sm font-medium"
              >
                Knowledge Base Content
              </label>
              <textarea
                name="knowledgeBase"
                id="knowledgeBase"
                defaultValue={currentKb}
                className={`
                  h-[60vh] w-full rounded-md border border-gray-300 p-4
                  font-mono text-sm shadow-sm
                  focus:border-orange-500 focus:ring-orange-500
                `}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className={`
                  rounded-md bg-orange-600 px-6 py-2 text-white shadow-md
                  transition-colors
                  hover:bg-orange-700
                  disabled:opacity-50
                `}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
