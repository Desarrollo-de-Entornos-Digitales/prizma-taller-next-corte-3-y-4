import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: true,
        env: {
            TEST_EMAIL: 'lsd@mail.com',
            TEST_PASSWORD: 'lsdlsdlsd',
        },
        setupNodeEvents(_on, _config) {
            // no plugins necesarios por ahora
        },
    },
});
