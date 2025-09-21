"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    constructor() {
        this.description = {
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
    }
    // A lógica de execução será adicionada no próximo passo
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.getInputData();
            let responseData;
            const returnData = [];
            for (let i = 0; i < items.length; i++) {
                try {
                    const min = this.getNodeParameter('min', i, 1);
                    const max = this.getNodeParameter('max', i, 100);
                    const randomUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
                    const fetch = globalThis.fetch || require('node-fetch');
                    const res = yield fetch(randomUrl);
                    if (!res.ok) {
                        throw new Error(`Erro ao buscar número aleatório: ${res.statusText}`);
                    }
                    responseData = yield res.text();
                    const randomNumber = parseInt(responseData.trim(), 10);
                    returnData.push({
                        json: {
                            randomNumber: randomNumber
                        },
                    });
                }
                catch (error) {
                    if (this.continueOnFail()) {
                        returnData.push({ json: { error: error.message } });
                        continue;
                    }
                    throw error;
                }
            }
            return [this.helpers.returnJsonArray(returnData)];
        });
    }
}
exports.Random = Random;
