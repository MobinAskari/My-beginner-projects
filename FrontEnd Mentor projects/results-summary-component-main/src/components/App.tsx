import { CirclePower } from 'lucide-react'
import { WhiteCardResultCard } from './white-card/summary-score-card'

function App() {
  return (
    <div className="h-screen w-full overflow-auto">
      <div className="flex size-full justify-center overflow-auto p-2 sm:items-center">
        <div className="h-[320px] w-[450px] rounded-2xl bg-white shadow-Pale-blue drop-shadow-lg">
          <div className="flex size-full flex-col min-[576px]:flex-row">
            <BlueCard />
            <WhiteCard />
          </div>
        </div>
      </div>
    </div>
  )
}

function BlueCard() {
  return (
    <div className="flex-1 rounded-2xl bg-Cobalt-blue/80">
      <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-white">
        <p>Your Result</p>
        <div className="flex min-h-24 min-w-24 flex-col items-center justify-center rounded-full bg-gradient-to-t from-Persian-blue-circle to-Violet-blue-circle">
          <p className="text-4xl font-bold">76</p>
          <p className="text-xs text-Light-lavender/80">of 100</p>
        </div>
        <div className="mt-auto flex flex-col items-center gap-2 p-2">
          <p className="text-lg font-bold">Great</p>
          <p className="text-center text-sm text-Light-lavender">
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
      </div>
    </div>
  )
}

function WhiteCard() {
  return (
    <div className="flex-1 rounded-2xl bg-white">
      <div className="flex size-full flex-col items-center justify-between gap-2 p-4 text-white">
        <p className="mr-auto font-bold text-Dark-gray-blue">Summary</p>
        <WhiteCardResultCard
          bgColor="bg-red-400/20"
          title={<p className="font-semibold text-red-400">Reaction</p>}
          score={80}
          icon={<CirclePower className="w-4 text-red-400" />}
          maxScore={100}
        ></WhiteCardResultCard>
        <WhiteCardResultCard
          bgColor="bg-yellow-400/20"
          title={<p className="font-semibold text-yellow-500">Memory</p>}
          score={92}
          icon={<CirclePower className="w-4 text-yellow-500" />}
          maxScore={100}
        ></WhiteCardResultCard>
        <WhiteCardResultCard
          bgColor="bg-green-400/20"
          title={<p className="font-semibold text-green-500">Reaction</p>}
          score={80}
          icon={<CirclePower className="w-4 text-green-500" />}
          maxScore={100}
        ></WhiteCardResultCard>
        <WhiteCardResultCard
          bgColor="bg-red-400/20"
          title={<p className="font-semibold text-red-400">Reaction</p>}
          score={80}
          icon={<CirclePower className="w-4 text-red-400" />}
          maxScore={100}
        ></WhiteCardResultCard>
        <button className="w-full rounded-full bg-Dark-gray-blue p-2">
          Continue
        </button>
      </div>
    </div>
  )
}

export default App
