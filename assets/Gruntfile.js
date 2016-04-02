module.exports = function(grunt) {
	
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
				include : ["jquery", "prism", "vide", "jquery-cycle2", "jquery.scrollTo"]
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
		}
	});
	
	/*
		TODO: watch files
		http://fuseinteractive.ca/blog/automating-bower-library-integration-grunt#.VjgDwq6rSRt
		
		shell: {
			//...
			bowerinstall: {
				command: function(libname){
					return "bower install " + libname + " -S";
				}
			},
			bowerupdate: {
				command: function(libname){
					return "bower update " + libname;
				}
			}
		}
	
		grunt.registerTask("bowerinstall", function(library) {
			grunt.task.run("shell:bowerinstall:" + library);
			grunt.task.run("buildbower");
		});
	
		grunt.registerTask("bowerupdate", function(library) {
			grunt.task.run("shell:bowerupdate:" + library);
			grunt.task.run("buildbower");
		});
	*/
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-bower-concat");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	grunt.registerTask("buildstyles",["watch:styles"]);
	grunt.registerTask("buildscripts", ["bower_concat", "uglify:bower", "watch:scripts"]);
};