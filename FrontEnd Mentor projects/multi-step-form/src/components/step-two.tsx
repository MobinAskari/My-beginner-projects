import { cn, createMonthlyPriceString, createYearlyPriceString } from "../utils"
import { Plan, PLANS } from "../data/data"
import { useForm } from "../hooks/use-form.js"

function StepTwoCardSelect(plan: Plan) {
	const {
		data: { billingCycle, selectedPlan, setSelectedPlan }
	} = useForm()

	const { id, title, pricePerMonth, pricePerYear, yearlyBonus, logoURL } = plan

	const isMonthly = billingCycle === "monthly"

	const isSelected = selectedPlan.id === id

	return (
		<div
			onClick={() => setSelectedPlan(plan)}
			className={cn(
				{ "border-marine-blue bg-magnolia": isSelected },
				"min-[375px]:gap-10",
				"max-[375px]:flex-row max-[375px]:items-center max-[375px]:w-full",
				"w-32 border rounded-lg p-3 flex flex-col gap-2 hover:border-marine-blue hover:cursor-pointer"
			)}
		>
			<div className="h-full mb-auto">
				<img
					width={36}
					height={36}
					src={logoURL}
					alt={title}
				/>
			</div>
			<div className="w-32 p-1 pt-0 flex flex-col gap-1">
				<p className="text-marine-blue font-bold">{title}</p>
				{isMonthly ? (
					<p className="text-cool-gray text-sm">
						{createMonthlyPriceString(pricePerMonth)}
					</p>
				) : (
					<p className="text-cool-gray text-sm">
						{createYearlyPriceString(pricePerYear)}
					</p>
				)}

				{/* Yearly plan only */}
				{isMonthly === false && yearlyBonus ? (
					<p className="text-marine-blue text-xs font-ubuntu-medium">
						{yearlyBonus}
					</p>
				) : null}
			</div>
		</div>
	)
}

export default function StepTwo() {
	const {
		data: { billingCycle, setBillingCycle }
	} = useForm()
	const isMonthly = billingCycle === "monthly"

	return (
		<div className="flex flex-col gap-4 max-w-96 justify-center">
			<h1 className="text-xl font-bold text-marine-blue">Select your plan</h1>
			<p className="text-cool-gray">
				You have the option of monthly or yearly billing.
			</p>
			<div className={cn("max-[375px]:flex-col", "flex gap-2 justify-between")}>
				{PLANS.map((plan) => (
					<StepTwoCardSelect
						key={plan.id}
						{...plan}
					/>
				))}
			</div>
			<div className="flex bg-light-gray/30 p-3 rounded-lg justify-evenly items-center transition-all duration-1000">
				<button
					onClick={() => setBillingCycle("monthly")}
					className={cn({
						"text-marine-blue": isMonthly,
						"text-cool-gray": !isMonthly
					})}
				>
					Monthly
				</button>
				<button
					onClick={() =>
						setBillingCycle((prev) => {
							return prev === "monthly" ? "yearly" : "monthly"
						})
					}
					className="w-14 h-7 bg-marine-blue rounded-2xl p-1 flex items-center"
				>
					<div
						className={cn(
							{ "ml-auto": !isMonthly },
							"w-5 h-5 rounded-full bg-white"
						)}
					></div>
				</button>
				<button
					onClick={() => setBillingCycle("yearly")}
					className={cn({
						"text-marine-blue": !isMonthly,
						"text-cool-gray": isMonthly
					})}
				>
					Yearly
				</button>
			</div>
		</div>
	)
}
