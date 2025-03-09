import { useForm } from "../hooks/use-form.js"
import { createMonthlyPriceString, createYearlyPriceString } from "../utils"

export default function StepFour() {
	const {
		form: { goTo },
		data: { billingCycle, selectedPlan, addOns }
	} = useForm()

	const isMonthly = billingCycle === "monthly"

	const finalPrice = (() => {
		if (isMonthly) {
			const price =
				selectedPlan.pricePerMonth +
				addOns
					.filter((addOn) => addOn.isSelected)
					.reduce((acc, curr) => {
						return acc + curr.pricePerMonth
					}, 0)

			return createMonthlyPriceString(price)
		}

		if (isMonthly === false) {
			const price =
				selectedPlan.pricePerYear +
				addOns
					.filter((addOn) => addOn.isSelected)
					.reduce((acc, curr) => {
						return acc + curr.pricePerYear
					}, 0)

			return createYearlyPriceString(price)
		}
	})()

	return (
		<div className="flex flex-col gap-4 justify-center">
			<h1 className="text-xl font-bold text-marine-blue">Finishing up</h1>
			<p className="text-cool-gray">
				Double-check everything looks OK before confirming.
			</p>
			<div className="space-y-2">
				<div className="bg-magnolia rounded-lg p-4 space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-marine-blue font-normal">
								{selectedPlan.title} (
								{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)})
							</p>
							<button
								className="text-cool-gray underline hover:text-purplish-blue transition-all"
								onClick={() => goTo(1)}
							>
								Change
							</button>
						</div>
						<span className="font-bold text-marine-blue">
							{isMonthly
								? "+" + createMonthlyPriceString(selectedPlan.pricePerMonth)
								: "+" + createYearlyPriceString(selectedPlan.pricePerYear)}
						</span>
					</div>
					<hr />
					<div className="space-y-2">
						{addOns
							.filter((addOn) => addOn.isSelected)
							.map((addOn) => (
								<div
									className="flex items-center justify-between text-sm"
									key={addOn.id}
								>
									<p className="text-cool-gray">{addOn.title}</p>
									<span>
										{isMonthly
											? "+" + createMonthlyPriceString(addOn.pricePerMonth)
											: "+" + createYearlyPriceString(addOn.pricePerYear)}
									</span>
								</div>
							))}
					</div>
				</div>
				<div className="flex items-center justify-between px-3">
					<p className="text-cool-gray">
						Total (per {isMonthly ? "month" : "year"})
					</p>
					<span className="text-purplish-blue font-bold">{finalPrice}</span>
				</div>
			</div>
		</div>
	)
}
