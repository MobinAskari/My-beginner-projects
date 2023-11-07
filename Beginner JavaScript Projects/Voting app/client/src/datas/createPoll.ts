import database from "../server/db";
import { PollCreatePayload } from "../types/poll.types";
import { UserAPIResponse } from "../types/user.types";

export default async function createPoll(
    title: string,
    categories: string[],
    choices: string[],
    closing_date: string | undefined
) {
    const user = database.authStore.model as UserAPIResponse;
    if (!user || !database.authStore.isValid) return false;

    const data: PollCreatePayload = {
        title,
        owner_id: user.id,
        categories: [],
        choices: [],
        closing_date: closing_date ? new Date(closing_date).toUTCString() : '',
        closed: false,
    };

    categories.forEach(category => {
        data.categories.push({
            name: category,
        });
    });

    choices.forEach((choice, i) => {
        data.choices.push({
            id: String(i + 1),
            name: choice,
            choosedBy: []
        });
    });

    try {
        const PollRes = await database.collection('polls').create(data);

        if (!PollRes) return;

        user.created_polls_ids.push(PollRes.id);

        const UserRes = await database.collection('users').update(user.id, user);
        if (!UserRes) return;

        await database.collection('users').authRefresh();
        return true;
    } catch (error) {
        console.log(error);

        return false
    }
}
