import {

    IExecuteFunctions,
    INodeType,
    INodeTypeDescription,
    INodeExecutionData,

} from 'n8n-workflow';

// Classe responsável pelo node customizado no n8n.

export class Random implements INodeType {
    
    // Configuração do node.

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

            // Parâmetro para selecionar o recurso ( útil para futuras expansões do node ).

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

            // Parâmetros para definir o intervalo ( min e max respectivamente ) do número aleatório.

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

                // Recebe os parâmetros min e max do node.

                const min = this.getNodeParameter('min', i, 1) as number;
                const max = this.getNodeParameter('max', i, 100) as number;

                /*
                    Rrequisição à API da Random.org para obter um número aleatório.

                    - Math.trunc() é usado para garantir que os valores min e max sejam inteiros.
                    - Não existe validação caso min seja maior que max, a API da Random.org retornará um erro nesse caso.

                */ 

                const endpoint = `https://www.random.org/integers/?num=1&min=${Math.trunc(min)}&max=${Math.trunc(max)}&col=1&base=10&format=plain&rnd=new`;

                const fetch = ( globalThis as any ).fetch || require( 'node-fetch' );
                const res = await fetch( endpoint );

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
        
        // Retorna o número aleatório gerado para o fluxo do n8n.

        return [ this.helpers.returnJsonArray( returnData ) ];

    }

}