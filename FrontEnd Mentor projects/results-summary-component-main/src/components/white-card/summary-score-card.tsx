import { type ReactNode } from 'react'
import { classNames } from 'utils'

export function WhiteCardResultCard({
  bgColor,
  maxScore,
  title,
  score,
  icon
}: {
  bgColor: string
  icon: ReactNode
  title: ReactNode
  score: number
  maxScore: number
}) {
  return (
    <div className={classNames('w-full rounded-lg p-2', bgColor)}>
      <div className="flex size-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}

          <div>{title}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-Cobalt-blue">{score}</span>

          <span className="text-Light-lavender">/</span>
          <span className="text-Light-lavender">{maxScore}</span>
        </div>
      </div>
    </div>
  )
}
