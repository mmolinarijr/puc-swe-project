import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API for the Puc Minas Software Engineer post graduation program app',
        },
        host: 'localhost:3000',
        schemes: ['http'],

        consumes: ['application/json'],
        produces: ['application/json'],

        // tags: [{ name: 'Hello World' }, { name: 'Version' }],
    },
    apis: ['./src/model/*.mjs', './src/router.mjs'],
};

const specs = swaggerJSDoc(options);

export default specs;
