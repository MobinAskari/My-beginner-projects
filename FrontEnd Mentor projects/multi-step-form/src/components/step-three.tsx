import { cn, createMonthlyPriceString, createYearlyPriceString } from "../utils"
import { useForm } from "../hooks/use-form.js"
import { selectAbleAddOn } from "../contexts/form-context.js"
import CheckmarkSVG from "/assets/images/icon-checkmark.svg?url"

function StepThreeAddOnCheckbox({
	id,
	title,
	description,
	pricePerMonth,
	pricePerYear,
	isSelected
}: selectAbleAddOn) {
	const {
		data: { billingCycle, setAddOns }
	} = useForm()
	const isMonthly = billingCycle === "monthly"

	return (
		<div
			onClick={() => {
				setAddOns((prev) =>
					prev.map((item) => {
						if (item.id === id)
							return {
								...item,
								isSelected: !item.isSelected
							}

						return item
					})
				)
			}}
			className={cn(
				{ "border-marine-blue bg-magnolia/80": isSelected },
				"w-full p-4 flex items-center gap-4 rounded-lg hover:cursor-pointer border hover:border-marine-blue"
			)}
		>
			<input
				className="hidden"
				type="checkbox"
				name={id}
				defaultChecked={isSelected}
			/>
			<label
				htmlFor={id}
				className={cn(
					"w-5 h-5 border rounded-md flex items-center justify-center cursor-pointer",
					{
						"bg-purplish-blue": isSelected
					}
				)}
			>
				<img
					className="w-3"
					src={CheckmarkSVG}
					alt="CheckmarkSVG"
				/>
			</label>
			<div className="w-full flex items-center justify-between text-xs">
				<div>
					<p className="font-bold text-marine-blue">{title}</p>
					<p className="text-cool-gray">{description}</p>
				</div>
				<p className="text-purplish-blue">
					{isMonthly
						? "+" + createMonthlyPriceString(pricePerMonth)
						: "+" + createYearlyPriceString(pricePerYear)}
				</p>
			</div>
		</div>
	)
}

export default function StepThree() {
	const {
		data: { addOns }
	} = useForm()

	return (
		<div className="flex flex-col gap-4 justify-center">
			<h1 className="text-xl font-bold text-marine-blue">Pick add-ons</h1>
			<p className="text-cool-gray">
				Add-ons help enhance your gaming experience
			</p>
			<div className="flex flex-col gap-2">
				{addOns.map((item) => (
					<StepThreeAddOnCheckbox
						key={item.title}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}
