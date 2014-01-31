'use strict';

module.exports = function(grunt) {

	// Creates time based report after Grunt task has finished
	require('time-grunt')(grunt);

	// Project configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),


		// SASS Output Configuration

		// https://github.com/gruntjs/grunt-contrib-sass/
		// https://npmjs.org/package/grunt-contrib-sass

		sass: {

			all: {
				options: {
					unixNewlines: true,
					style: 'nested'
				},

				files: [{
					expand: true,
					cwd: 'scss',
					src: [
						'**/*.scss'
					],
					dest: 'css',
					ext: '.css'
				}],
			},
			
		},



		// Automatically prefix properties that require a CSS3 vendor prefixes - border-radius, box-shadow, linear-gradient etc.

		// https://github.com/nDmitry/grunt-autoprefixer
		// https://npmjs.org/package/grunt-autoprefixer

		autoprefixer: {
			
			all: {
				options: {
					// Reference for current Graded Browser Support: https://wiki.gbb.thehut.local/wiki/index.php/Graded_Browser_Support
					browsers: [
						'last 2 versions',
						'safari >= 5',
						'ie >= 7',
						'opera >= 12',
						'ios >= 3.2.2',
						'android >= 4.1',
					],
				},

				files: [{
					expand: true,
					cwd: 'css',
					src: [
						'**/*.css',
					],
					dest: 'css',
					ext: '.css'
				}],
				
			},

		},



		// Combine Media Queries

		// https://github.com/buildingblocks/grunt-combine-media-queries
		// https://npmjs.org/package/grunt-combine-media-queries

		cmq: {
			
			all: {
				options: {
					log: true
				},

				files: [{
					expand: true,
					cwd: 'css',
					src: [
						'**/*.css',
					],
					dest: 'css',
					ext: '.css'
				}],
			},

		},



		// Minify CSS

		// https://github.com/gruntjs/grunt-contrib-cssmin
		// https://npmjs.org/package/grunt-contrib-cssmin

		cssmin: {

			all: {
				options: {
					report: 'min'
				},

				files: [{
					expand: true,
					cwd: 'css',
					src: [
						'**/*.css',
					],
					dest: 'css',
					ext: '.css'
				}],
			},

		},

		

		// Construct Sprite

		// https://npmjs.org/package/grunt-spritesmith
		// https://github.com/Ensighten/grunt-spritesmith

		sprite: {

			demoNormal: {
				src:  'img/sprite/1x/*.png',
				destImg:  'img/sprite.png',
				destCSS: 'scss/_spritesmith.scss',
				algorithm: 'binary-tree',
				// algorithm: 'alt-diagonal',
				padding: 20,
				cssFormat: 'scss',
				cssOpts: {
					cssClass: function(item) {
						return '.' + item.name;
					},
				},
			},

			demoRetina: {
				src:  'img/sprite/2x/*.png',
				destImg:  'img/sprite-2x.png',
				destCSS: 'scss/_spritesmith-2x.scss',
				algorithm: 'binary-tree',
				// algorithm: 'alt-diagonal',
				padding: 40,
				cssFormat: 'scss',
				cssOpts: {
					'functions': false,
				},
			},

		},



		// Optimize images

		// https://github.com/gruntjs/grunt-contrib-imagemin
		// https://npmjs.org/package/grunt-contrib-imagemin

		imagemin: {

			all: {
				files: [{
					expand: true,
					cwd: 'img',
					src: [
						'**/*.{png,gif}',
						'!sprite/**/*.{png,gif}'
					],
					dest: 'img'
				}]
			},

		},



		// Lint Javascript

		// https://github.com/gruntjs/grunt-contrib-jshint
		// https://npmjs.org/package/grunt-contrib-jshint

		jshint: {

			all: {
				options: {
					curly: true,
					eqeqeq: true,
					eqnull: true,
					browser: true,
					globals: {
						jQuery: true
					},
				},

				files: {
					src: ['js/**/*.js']
				},
			},

		},



		// Start Web Server
		
		// https://github.com/gruntjs/grunt-contrib-connect
		// https://npmjs.org/package/grunt-contrib-connect


		connect: {

			server: {

				options: {
					port: 9000,
					base: '.',
				}

			},

		},



		// Grunt Watch

		// https://github.com/gruntjs/grunt-contrib-watch
		// https://npmjs.org/package/grunt-contrib-watch

		watch: {

			sass: {
				files: ['scss/**/*.scss'],
				tasks: [
					'sass',
					'autoprefixer'
				],
			},

			css: {
				options: {
					livereload: true,
				},

				files: ['css/**/*.css'],
			},

		},



	});


	// Loads Grunt tasks
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');


	// Custom Grunt tasks
	grunt.registerTask('default', ['sass']);

	grunt.registerTask('server', ['connect', 'watch']);

	grunt.registerTask('build', [
		'sprite',
		'sass',
		'autoprefixer',
		'cmq',
		'cssmin',
		'imagemin'
	]);


};