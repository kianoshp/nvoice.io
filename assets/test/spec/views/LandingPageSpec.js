require(['jquery'], function($){
	describe('Landing Page', function(){
		var landingPageMessage;
		it("works for simple literals and variables", function() {
			var a = 12;
			expect(a).toEqual(12);
	    });
		/*it('rendered the landing page', function(){
			runs(function(){
				$.ajax({
					type: 'GET',
					url: '/initialPage',
					contentType: 'application/json; charset=utf-8',
					dataType: 'json',
					success: function(data) {
						landingPageMessage = data;
					},
					error: function(error) {
						console.log('Couldn\'t get the data');
					}
				});
			});

			waitsFor(function(){
				return landingPageMessage;
			}, 'The value should be set', 1000);

			runs(function(){
				expect(landingPageMessage).not.toBeUndefined();
			});
		});

		it('Landing page should have a message', function(){
			expect(landingPageMessage.message).not.toBeNull();
		});
		*/

	});

});