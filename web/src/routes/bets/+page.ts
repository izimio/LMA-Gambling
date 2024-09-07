// src/routes/dashboard/+page.ts
// import type { IGambling } from '$lib/bets/bet';
import axios from 'axios';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

    // const response = await fetch('/api/bets'); // Remplacez cette URL par l'URL correcte de votre API
    // const bets = await response.json();

    // const bets: Array<IGambling> = [
    //     {
    //         _id: '1',
    //         createdAt: new Date(),
    //         title: 'Who will win the US presidential election?',
    //         imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    //         votes: [
    //             {
    //                 email: 'leroyerbaptiste@gmail.com',
    //                 choice: [0],
    //                 gamble: 0
    //             },
    //         ],
    //         choices: [
    //             {
    //                 title: 'Donald Trump',
    //                 id: 0
    //             },
    //             {
    //                 title: 'Joe Biden',
    //                 id: 1
    //             }
    //         ],
    //         owner: 'leroyerbaptiste@gmail.com',
    //         ended: false,
    //         multiChoices: false
    //     },
    //     {
    //         _id: '2',
    //         createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    //         title: 'Who will win the US presidential election?',
    //         imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    //         votes: [
    //             {
    //                 email: 'leroyerbaptiste@gmail.com',
    //                 choice: [0],
    //                 gamble: 0
    //             },
    //         ],
    //         choices: [
    //             {
    //                 title: 'Donald Trump',
    //                 id: 0
    //             },
    //             {
    //                 title: 'Joe Biden',
    //                 id: 1
    //             }
    //         ],
    //         owner: 'leroyerbaptiste@gmail.com',
    //         ended: false,
    //         multiChoices: false
    //     },
    //     {
    //         _id: '3',
    //         createdAt: new Date(),
    //         title: 'Who will win the US presidential election?',
    //         imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    //         votes: [],
    //         choices: [
    //             {
    //                 title: 'Donald Trump',
    //                 id: 0
    //             },
    //             {
    //                 title: 'Joe Biden',
    //                 id: 1
    //             }
    //         ],
    //         owner: 'leroyerbaptiste@gmail.com',
    //         ended: false,
    //         multiChoices: false
    //     },
    //     {
    //         _id: '4',
    //         createdAt: new Date(),
    //         title: 'Who will win the US presidential election?',
    //         imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    //         votes: [],
    //         choices: [
    //             {
    //                 title: 'Donald Trump',
    //                 id: 0
    //             },
    //             {
    //                 title: 'Joe Biden',
    //                 id: 1
    //             }
    //         ],
    //         owner: 'leroyerbaptiste@gmail.com',
    //         ended: false,
    //         multiChoices: false
    //     }
    // ];

    try {
        const response = await axios.get(`${apiUrl}/gambling`);

        if (response.status === 200) {
            console.log(response.data.data);
            return {
                bets: response.data.data
            };
        } else {
            return {
                bets: []
            };
        }
    } catch (error) {
        return {
            bets: []
        };
    }
};
