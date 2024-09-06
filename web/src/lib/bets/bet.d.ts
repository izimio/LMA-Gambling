export interface IGambling {
    _id: string;
    createdAt: Date;
    title: string;
    imageUrl: string;
    votes: IVote[];
    choices: {
        title: string;
        id: number;
    }[];
    owner: string;
    ended: boolean
}

interface IVote {
    email: string;
    choice: number[];
    gamble: number;
}
