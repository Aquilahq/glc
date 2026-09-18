import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/prayer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prayer"!</div>
}
