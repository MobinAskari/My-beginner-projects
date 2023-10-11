import database from "../server/db";
import { PollAPIResponse } from "../types/poll.types";
import { UserAPIResponse } from "../types/user.types";

export default async function retractUserVote(
    userId: string,
    pollId: string,
    poll_choice_id: string
) {
    try {
        const user = await database.collection('users').getOne(userId) as UserAPIResponse;
        const { voted_polls } = user;
        const voteToRetractIndex = voted_polls.findIndex(val => val.poll_id === pollId);

        if (
            voteToRetractIndex === null || voteToRetractIndex === undefined
        ) return;

        voted_polls.splice(voteToRetractIndex, 1);
        database.collection('users').update(user.id, user);

        const poll = await database.collection('polls').getOne(pollId) as PollAPIResponse;

        if (!poll) return;

        const choiceToRetractFrom = poll.choices.find(val => val.id === poll_choice_id);

        if (!choiceToRetractFrom) return;

        const choiceToDeleteVoteIndex = choiceToRetractFrom.choosedBy.findIndex(val => val.userId === userId);

        if (
            choiceToDeleteVoteIndex === null || choiceToDeleteVoteIndex === undefined
        ) return;

        choiceToRetractFrom.choosedBy.splice(choiceToDeleteVoteIndex, 1);

        database.collection('polls').update(poll.id, poll);

        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}