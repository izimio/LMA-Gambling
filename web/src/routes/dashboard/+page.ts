import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    return {
        contacts: [
            {
                id: "1",
                name: 'John Doe',
                phone: '+1234567890'
            },
            {
                id: "2",
                name: 'Jane Doe',
                phone: '+0987654321'
            },
            {
                id: "3",
                name: 'John Smith',
                phone: '+1234567890'
            }
        ]
    }
}
