module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// grunt.loadNpmTasks('grunt-libsass');
	// grunt.loadNpmTasks('grunt-combine-mq');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// grunt.loadNpmTasks('grunt-groundskeeper');
   // grunt.loadNpmTasks('grunt-closurecompiler');	

	grunt.initConfig({

		watch:{
			options:{
					livereload: true
			},

			css:{
					files: [	
								"css/**/*.css",
								"!css/temp/**/*.css"
							],
					tasks: ["css--dev"]
			},

			// js:{
			// 	files: [
			// 				"js/**/*.js"
			// 			],
			// 	tasks: ["concat:js"]
			// },

			grunt: {
				files: ['gruntfile.js']
			}
		},


		concat: {		
			'css': {
				src: [
						"css/normalize.css",
						"css/helpers.css",
						"css/holding.css"
					], 
				dest: 'css/temp/_concat.css',
				nonull: true
			}
			//,
			// 'js': {
			// 	src: [
			// 			"js/**/*.js"
			// 		], 
			// 	dest: 'deploy_js/holding.min.js',
			// 	nonull: true
			// }	
		},


		//* CSS TASKS *//
		copy:{
			css:{
				src: 'css/temp/_concat.css',
				dest: 'deploy_css/holding.min.css'
			}
		},

		cssmin:{
			'deploy':{
				files: [
					{
						src: 'css/temp/_concat.css',
						dest: 'deploy_js/holding.min.css'
					}
				]
			}
		}
		//,


		// //* JS TASKS *//
		// groundskeeper: {
		// 	deploy: {
		// 		options: {
		// 		},
		// 		files: {
		// 			"js/_temp_groundskeepered.js" : ["js/_temp_mine_concat.js"]
		// 		}
		// 	}
		// },

		// closurecompiler: {
		// 	deploy: {
		// 		files: {
		// 			"js/_temp_closurecompiled.js": ["js/_temp_ngannotated.js"]
		// 		},
		// 		options: {
		// 			"compilation_level": "SIMPLE_OPTIMIZATIONS",
		// 			"max_processes": 5,
		// 			"language_in": "ECMASCRIPT5",
		// 			"warning_level" : "QUIET"
		// 		}
		// 	}
		// }		
	});


	//https://github.com/gruntjs/grunt-contrib-concat/issues/17
	grunt.registerTask('warn-fail', 'Fail on warning log', function() {
		var log = grunt.log;
		var _warn = log.warn;
		log.warn = function() {
		  _warn.apply(log, arguments);
		  grunt.fail.warn("Warning log has triggered failure");
		};
	});


	//DEV
	grunt.registerTask('css--dev', ['warn-fail', 'concat:css', 'copy:css']);
	// grunt.registerTask('js--dev', ['warn-fail','concat:js--dev','copy']);

	//DEPLOY
	// grunt.registerTask('css--dev', ['warn-fail', 'concat:css', 'cssmin:deploy']);
	// grunt.registerTask('js--deploy', ['warn-fail','concat:js--myCodeOnly', 'groundskeeper', 'ngAnnotate:deploy', 'closurecompiler:deploy', 'concat:js--deploy--all']);
};