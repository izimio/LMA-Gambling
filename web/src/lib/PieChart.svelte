<!-- src/lib/PieChart.svelte -->
<script lang="ts">
    import { Pie } from 'svelte-chartjs';
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

    // Register required components
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    export let choices: Array<{ title: string; id: number }>;
    export let votes: Array<{ email: string; choice: number[] }>;

    // Calculate the distribution of votes for each choice
    const voteCounts = choices.map(choice => {
        return votes.reduce((count, vote) => {
            // return count + (vote.choice.includes(choice.id) ? 1 : 0);
            return count + (vote.choice[0] === choice.id ? 1 : 0);
        }, 0);
    });

    const data = {
        labels: choices.map(choice => choice.title),
        datasets: [{
            data: voteCounts,
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ' + context.raw + ' votes';
                        }
                        return label;
                    }
                }
            }
        }
    };
</script>

<div class="w-full max-w-md mx-auto">
    <Pie {data} {options} />
</div>
