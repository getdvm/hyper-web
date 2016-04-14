module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		sass : {
			dist : {
				options: {
					style: "compressed"
      			},
				files : {
					"css/style.min.css" : "scss/main.scss"
				}
			}
		},

		watch : {

			scripts : {
				files: ["js/main.js"],
				tasks: ["uglify:bower"]
			},

			styles : {
				files: "**/*.scss",
			  tasks: ["sass"]
			}
		},

		bower_concat : {

			all : {
				dest : "js/bundle.js",
				exclude : ["modernizr"],
				include : ["jquery", "prism", "vide", "jquery-cycle2", "jquery.scrollTo", "isInViewport"]
			}
		},

		uglify : {
			bower : {
				options: {
					mangle : true,
					compress : true
    			},
				files : {
					"js/bundle.min.js" : ["js/bundle.js", "js/main.js"]
    			}
  			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			default: {
				tasks: ['buildstyles', 'buildscripts']
			}
    }
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-bower-concat");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask("buildstyles",["sass", "watch:styles"]);
	grunt.registerTask("buildscripts", ["bower_concat", "uglify:bower", "watch:scripts"]);
	grunt.registerTask("default", ["concurrent:default"]);
};
