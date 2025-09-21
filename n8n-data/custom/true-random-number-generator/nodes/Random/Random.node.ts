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
        icon: 'file:Random.node.svg',
        group: ['transform'],
        version: 1,
        description: 'Um conector para gerar números aleatórios usando a API da Random.org.',
        defaults: { name: 'Random' },
        inputs: ['main'],
        outputs: ['main'],
        properties: [

            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'True Random Number Generator',
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
                description: 'O menor valor inteiro a ser considerado',
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'O maior valor inteiro a ser considerado',
            }

        ]

    };

    async execute( this: IExecuteFunctions ): Promise<INodeExecutionData[][]> {

        const items = this.getInputData();
        const returnData = [];
        let responseData;

        for ( let i = 0; i < items.length; i++ ) {

            try {

                const min = this.getNodeParameter('min', i, 1) as number;
                const max = this.getNodeParameter('max', i, 100) as number;

                const randomOrgUrl = `https://www.random.org/integers/?num=1&min=${Math.trunc(min)}&max=${Math.trunc(max)}&col=1&base=10&format=plain&rnd=new`;

                const fetch = ( globalThis as any ).fetch || require( 'node-fetch' );
                const res = await fetch( randomOrgUrl );

                if ( !res.ok ) throw new Error( `Erro na requisição ao Random.org: ${res.statusText}` );

                responseData = await res.text();

                const randomNumber = parseInt( responseData.trim(), 10 );

                returnData.push({ json: { randomNumber: randomNumber } });

            } catch ( error ) {

                if ( this.continueOnFail() ) {

                    returnData.push({ json: { error: ( error as Error ).message } });
                    continue;

                }

                throw error;

            }
        }

        return [ this.helpers.returnJsonArray( returnData ) ];

    }

}