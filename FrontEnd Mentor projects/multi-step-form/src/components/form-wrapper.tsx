import { ReactNode } from "react"
import { cn } from "../utils"

type FormWrapperProps = {
	children: ReactNode
}

export function FormWrapper({ children }: FormWrapperProps) {
	return (
		<div
			className={cn(
				`bg-white rounded-lg w-fit flex flex-col items-center gap-3 p-4 min-[375px]:h-full`,
				`max-[375px]:absolute max-[375px]:-top-12 left-4 right-4`
			)}
		>
			{children}
		</div>
	)
}
