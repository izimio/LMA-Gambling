// src/routes/bets/[id]/+page.ts
import type { IGambling } from '$lib/bets/bet';
import axios from 'axios';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    // const bet: IGambling = {
    //     _id: '1',
    //     createdAt: new Date(),
    //     title: 'Who will win the US presidential election?',
    //     imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    //     votes: [
    //         {
    //             email: 'leroyerbaptiste@gmail.com',
    //             choice: [0, 2, 1],
    //             gamble: 0
    //         },
    //         {
    //             email: 'truc 2',
    //             choice: [1, 0, 2],
    //             gamble: 1
    //         },
    //         {
    //             email: 'truc 3',
    //             choice: [0, 1, 2],
    //             gamble: 0
    //         },
    //         {
    //             email: 'truc 4',
    //             choice: [2, 1, 0],
    //             gamble: 0
    //         }
    //     ],
    //     choices: [
    //         {
    //             title: 'Donald Trump',
    //             id: 0
    //         },
    //         {
    //             title: 'Joe Biden',
    //             id: 1
    //         },
    //         {
    //             title: 'Kanye West',
    //             id: 2
    //         }
    //     ],
    //     owner: 'leroyerbaptiste@gmail.com',
    //     ended: false,
    //     multiChoices: true
    // };

    const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

    const { id } = params;

    let bet: IGambling;

    try {
        const response = await axios.get(`${apiUrl}/gambling/${id}`);

        bet = response.data.data;

        return {
            bet
        };
    } catch (error) {
        console.error(error);

        bet = {
            _id: '',
            createdAt: new Date(),
            title: 'ERROR',
            imageUrl: '',
            votes: [],
            choices: [],
            owner: '',
            ended: true,
            multiChoices: false
        }

        return {
            status: 404,
            error: new Error('Failed to fetch bet'),
            bet: bet
        };
    }
};
