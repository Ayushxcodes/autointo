import { EditorCanvasCardType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useMemo } from 'react'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './editor-canvas-card-icon-hepler'
import CustomHandle from './custom-handle'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import clsx from 'clsx'

const EditorCanvasCardSingle = ({ data }: { data: EditorCanvasCardType }) => {
  const { dispatch, state } = useEditor()
  const nodeId = useNodeId()

  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />
  }, [data])

  return (
    <>
      {/* Top Handle (for incoming connections) */}
      {data.type !== 'Trigger' && data.type !== 'Google Drive' && (
        <CustomHandle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}

      {/* Main Node Card */}
      <Card
        onClick={(e) => {
          e.stopPropagation()
          const val = state.editor.elements.find((n) => n.id === nodeId)
          if (val)
            dispatch({
              type: 'SELECTED_ELEMENT',
              payload: { element: val },
            })
        }}
        className={clsx(
          'relative w-[340px] cursor-pointer select-none transition-all duration-200',
          'border border-border/50 shadow-sm hover:shadow-md',
          'bg-card hover:bg-accent/20 dark:border-muted-foreground/60 rounded-xl'
        )}
      >
        <CardHeader className="flex flex-row items-center gap-4 p-4">
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {logo}
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <CardTitle className="text-base font-medium text-foreground">
              {data.title}
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground">
              <p className="truncate text-xs">
                <span className="font-medium text-foreground/80">ID:</span>{' '}
                {nodeId}
              </p>
              <p className="line-clamp-2 text-xs">{data.description}</p>
            </CardDescription>
          </div>
        </CardHeader>

        {/* Node Type Badge */}
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 text-[10px] font-semibold uppercase tracking-wide"
        >
          {data.type}
        </Badge>

        {/* Status Dot */}
        <div
          className={clsx(
            'absolute left-3 top-3 h-2 w-2 rounded-full transition-colors duration-200',
            {
              'bg-green-500': Math.random() < 0.6,
              'bg-orange-500': Math.random() >= 0.6 && Math.random() < 0.8,
              'bg-red-500': Math.random() >= 0.8,
            }
          )}
        />
      </Card>

      {/* Bottom Handle (for outgoing connections) */}
      <CustomHandle type="source" position={Position.Bottom} id="a" />
    </>
  )
}

export default EditorCanvasCardSingle
