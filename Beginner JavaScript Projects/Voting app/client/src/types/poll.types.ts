type PollCategory = {
  name: string,
}

export type ChoosedBy = {
  userId: string,
  date: string
}

type PollChoice = {
  id: string, /* Auto gen */
  name: string,
  choosedBy: ChoosedBy[] /* Users IDs */
}

interface BasePoll {
  title: string,
  owner_id: string,
  categories: PollCategory[],
  choices: PollChoice[],
}

export interface PollAPIResponse extends BasePoll {
  id: string,
  collectionId: string,
  collectionName: string,
  closing_date: string | null,
  closed: boolean,
  created: string,
  updated: string
}

export interface PollCreatePayload extends BasePoll {
  id?: string,
  closing_date?: string,
  closed?: boolean,
}