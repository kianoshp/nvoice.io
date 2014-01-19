define(['underscore', 'jquery', 'backbone', 'views/landingPageView', 'models/initialPageModel'],
	function(_, $, Backbone, LandingPageView, InitialPageModel){
		console.log('I have succesfully created the backbone structure');

		var AppRouter = Backbone.Router.extend({
			routes: {
				'' : 'renderInitialPage',
				'newIssue': 'renderIt'
			},

			renderInitialPage: function(){
				console.log('Going to render the first button');
				var initialPageModel = new InitialPageModel();
				var landingPageView = new LandingPageView({
					model: initialPageModel
				});

				landingPageView.listenTo(initialPageModel, 'change', landingPageView.render);

				initialPageModel.fetch();
			},

			renderIt: function(){
				console.log('here we go');
			}

		});

		var appRouter = new AppRouter();
		Backbone.history.start();
	});