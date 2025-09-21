import {
    IExecuteFunctions,
    INodeType,
    INodeTypeDescription,
    INodeExecutionData,
} from 'n8n-workflow';

export class Random implements INodeType {

    description: INodeTypeDescription = {
        displayName: 'True Random Number',
        name: 'random',
        icon: 'file:Random.node.svg', // Referencia o ícone 
        group: ['transform'],
        version: 1,
        description: 'Um conector para gerar números aleatórios usando a API da Random.org.',
        defaults: {
            name: 'Random',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // Define a operação a ser executada
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'True Random Number Generator', // Nome da operação conforme solicitado [cite: 48]
                        value: 'trueRandomNumber',
                    },
                ],
                default: 'trueRandomNumber',
                noDataExpression: true,
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'O menor valor inteiro a ser considerado (inclusivo)', // Nome amigável [cite: 56]
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'O maior valor inteiro a ser considerado (inclusivo)', // Nome amigável [cite: 56]
            },
        ],
    };

    // A lógica de execução será adicionada no próximo passo
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

        const items = this.getInputData();
        let responseData;
        const returnData = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const min = this.getNodeParameter('min', i, 1) as number;
                const max = this.getNodeParameter('max', i, 100) as number;

                const randomUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

                const fetch = (globalThis as any).fetch || require('node-fetch');
                const res = await fetch(randomUrl);

                if (!res.ok) {
                    throw new Error(`Erro ao buscar número aleatório: ${res.statusText}`);
                }

                responseData = await res.text();

                const randomNumber = parseInt(responseData.trim(), 10);

                returnData.push({
                    json: {
                        randomNumber: randomNumber
                    },
                });

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }

        return [this.helpers.returnJsonArray(returnData)];

    }

}