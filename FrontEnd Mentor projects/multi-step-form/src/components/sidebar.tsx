import { useForm } from "../hooks/use-form.js"
import { userInfoSchema } from "../schemas/index.js"
import { cn } from "../utils"

function SidebarItem({
	stepNumber,
	title
}: {
	stepNumber: number
	title: string
}) {
	const {
		data,
		form: { currentStepIndex, isCompleted, goTo }
	} = useForm()

	const isActive = currentStepIndex === stepNumber

	const stepNumToShow = stepNumber + 1

	const canNavigate = (() => {
		if (isCompleted) return false

		const { userInfo } = data

		const parsed = userInfoSchema.safeParse(userInfo)

		return parsed.success
	})()

	return (
		<div
			className={cn("flex items-center gap-4 rounded-full select-none", {
				"hover:cursor-pointer": canNavigate
			})}
			onClick={() => {
				if (canNavigate) goTo(stepNumber)
			}}
		>
			<div
				className={cn(
					{ "bg-light-blue": isActive },
					{
						"border  border-white text-white": !isActive
					},
					`max-[375px]:min-w-8 max-[375px]:min-h-8`,
					`min-[375px]:min-w-10 min-[375px]:min-h-10`,
					`rounded-full flex items-center justify-center`
				)}
			>
				{stepNumToShow}
			</div>
			<div className="max-[375px]:hidden">
				<p className="text-light-gray">STEP {stepNumToShow}</p>
				<p className="text-white font-bold">{title.toUpperCase()}</p>
			</div>
		</div>
	)
}

export default function Sidebar() {
	const {
		form: { steps }
	} = useForm()

	return (
		<div
			className={cn(
				`max-[375px]:bg-[url(/public/assets/images/bg-sidebar-mobile.svg)]`,
				`min-[375px]:bg-[url(/public/assets/images/bg-sidebar-desktop.svg)]`,

				"max-[375px]:h-[170px] max-[375px]:flex-row max-[375px]:justify-center max-[375px]:pb-20",
				`min-[375px]:w-96 min-[375px]:h-[570px]`,

				"bg-no-repeat flex flex-col gap-4 p-4 pt-8"
			)}
		>
			{steps.map((step, i) => (
				<SidebarItem
					key={i}
					stepNumber={i}
					title={step.title}
				/>
			))}
		</div>
	)
}
