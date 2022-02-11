module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '954520770@qq.com',
                token: 'e5524bf3-beec-4058-8383-249d34adfb65',
                branch: 'default',
                // server: 'season'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
            }
        }
    });
}