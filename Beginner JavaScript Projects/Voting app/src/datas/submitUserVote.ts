import { RecordModel } from "pocketbase";
import database from "../server/db";
import { UserAPIResponse, Vote } from "../types/user.types";
import { ChoosedBy, PollAPIResponse } from "../types/poll.types";

export default async function submitUserVote(
    userId: string,
    pollId: string,
    poll_choice_id: string
) {
    try {
        const user = await database.collection('users').getOne(userId) as UserAPIResponse;
        const { voted_polls } = user;
        const previousVoteWithThisId = voted_polls.find(val => val.poll_id === pollId);

        if (previousVoteWithThisId) return;

        voted_polls.push({
            poll_id: pollId,
            poll_choice_id: poll_choice_id,
            date: new Date().toISOString()
        } as Vote);

        await database.collection('users').update(user.id, user);

        const poll = await database.collection("polls").getOne(pollId) as PollAPIResponse;
        const userChoice = poll.choices.find(val => val.id === poll_choice_id);
        if (!userChoice) return;

        const userVote = userChoice.choosedBy.find(val => val.userId === user.id);

        if (userVote) return;

        userChoice.choosedBy.push({
            date: new Date().toISOString(),
            userId: user.id
        } as ChoosedBy);

        await database.collection("polls").update(poll.id, poll);


    } catch (error) {
        alert(error);
        return false;

    }
}