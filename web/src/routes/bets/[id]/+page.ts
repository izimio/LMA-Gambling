import type { IGambling } from '$lib/bets/bet';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const bet: IGambling = {
        _id: '1',
        createdAt: new Date(),
        title: 'Who will win the US presidential election?',
        imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
        votes: [
            {
                email: 'leroyerbaptiste@gmail.com',
                choice: [0, 2, 1],
                gamble: 0
            },
            {
                email: 'truc 2',
                choice: [1, 0, 2],
                gamble: 1
            },
            {
                email: 'truc 3',
                choice: [0, 1, 2],
                gamble: 0
            },
            {
                email: 'truc 4',
                choice: [2, 1, 0],
                gamble: 0
            }
        ],
        choices: [
            {
                title: 'Donald Trump',
                id: 0
            },
            {
                title: 'Joe Biden',
                id: 1
            },
            {
                title: 'Kanye West',
                id: 2
            }
        ],
        owner: 'leroyerbaptiste@gmail.com',
        ended: false,
        multiChoices: true
    };

    return {
        bet
    };
};
